import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { revalidatePublicData } from "@/lib/revalidate";

// POST /api/admin/approve/[id] - Approve a profile or photo
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

    if (type === "photo") {
      const photo = await db.photo.update({
        where: { id },
        data: {
          status: "APPROVED",
          approvedAt: new Date(),
        },
      });
      revalidatePublicData();
      return NextResponse.json(photo);
    } else {
      // Default: approve profile
      const profile = await db.profile.update({
        where: { id },
        data: {
          status: "APPROVED",
          approvedAt: new Date(),
        },
      });
      revalidatePublicData();
      return NextResponse.json(profile);
    }
  } catch (error) {
    console.error("Approve error:", error);
    return NextResponse.json(
      { error: "Error al aprobar" },
      { status: 500 }
    );
  }
}
