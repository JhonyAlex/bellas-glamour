import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// POST /api/admin/reject/[id] - Reject a profile or photo
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }
    
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const type = body.type as "profile" | "photo" | undefined;
    const reason = body.reason as string | undefined;
    
    if (type === "photo") {
      const photo = await db.photo.update({
        where: { id },
        data: {
          status: "REJECTED",
          rejectionReason: reason || "No especificada",
        },
      });
      return NextResponse.json(photo);
    } else {
      // Default: reject profile
      const profile = await db.profile.update({
        where: { id },
        data: {
          status: "REJECTED",
        },
      });
      return NextResponse.json(profile);
    }
  } catch (error) {
    console.error("Reject error:", error);
    return NextResponse.json(
      { error: "Error al rechazar" },
      { status: 500 }
    );
  }
}
