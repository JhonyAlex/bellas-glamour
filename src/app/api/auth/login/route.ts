import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, generateToken, setAuthCookie } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);
    
    // Find user
    const user = await db.user.findUnique({
      where: { email: validatedData.email },
      include: { profile: true },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }
    
    // Verify password
    const isValidPassword = await comparePassword(validatedData.password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Credenciales incorrectas" },
        { status: 401 }
      );
    }
    
    // Generate token
    const token = generateToken(user.id);
    
    // Create response
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
      profile: user.profile,
      token,
    });
    
    // Set auth cookie
    setAuthCookie(response, token);
    
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
