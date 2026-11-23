/**
 * Minimal password auth for /admin. Works in both Edge (middleware) and Node runtimes.
 * The cookie holds an HMAC of a fixed payload, so it can't be forged without the secret,
 * and rotating ADMIN_PASSWORD or ADMIN_SESSION_SECRET signs everyone out.
 */
export const ADMIN_COOKIE = "admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function hmac(message: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export async function createSessionToken() {
  return hmac(`admin:${process.env.ADMIN_PASSWORD}`, process.env.ADMIN_SESSION_SECRET!);
}

export async function verifySessionToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const expected = await createSessionToken();
  return timingSafeEqual(token, expected);
}

export async function verifyPassword(input: string) {
  if (!isAdminConfigured()) return false;
  // Compare HMACs so comparison time doesn't leak the password length/content
  const secret = process.env.ADMIN_SESSION_SECRET!;
  const [a, b] = await Promise.all([hmac(input, secret), hmac(process.env.ADMIN_PASSWORD!, secret)]);
  return timingSafeEqual(a, b);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
