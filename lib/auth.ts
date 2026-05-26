import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = createHmac("sha256", getSecret()).update("admin").digest("hex");

function getSecret() {
  return process.env.ADMIN_SECRET || "wedding-admin-dev-secret";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}

export function createSessionToken() {
  return SESSION_VALUE;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  try {
    const a = Buffer.from(token);
    const b = Buffer.from(SESSION_VALUE);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyPassword(password: string) {
  return password === getAdminPassword();
}
