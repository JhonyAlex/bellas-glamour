import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;
const TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

// Simple JWT-like token generation (for demo purposes)
// In production, use a proper JWT library
export function generateToken(userId: string): string {
  const payload = {
    userId,
    exp: Date.now() + TOKEN_EXPIRY,
    random: Math.random().toString(36).substring(7),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64url").toString());
    if (payload.exp < Date.now()) {
      return null;
    }
    return { userId: payload.userId };
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  
  if (!token) {
    return null;
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }
  
  const user = await db.user.findUnique({
    where: { id: decoded.userId },
    include: {
      profile: true,
    },
  });
  
  return user;
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function checkAuth(request: NextRequest) {
  const user = await getCurrentUser(request);
  return user;
}

export async function requireAuth(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) {
    return null;
  }
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user || user.role !== "ADMIN") {
    return null;
  }
  return user;
}
