import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

// DELETE /api/photos/[id] - Delete a photo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Find the photo
    const photo = await db.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      return NextResponse.json(
        { error: "Foto no encontrada" },
        { status: 404 }
      );
    }

    // Only the uploader or an admin can delete
    if (photo.uploaderId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "No tienes permiso para eliminar esta foto" },
        { status: 403 }
      );
    }

    // Delete the physical file
    if (photo.url.startsWith("/uploads/")) {
      const filename = photo.url.replace("/uploads/", "");
      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      try {
        await unlink(filePath);
      } catch {
        // File might not exist (already deleted or lost), continue anyway
      }
    }

    // Delete from database
    await db.photo.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete photo error:", error);
    return NextResponse.json(
      { error: "Error al eliminar foto" },
      { status: 500 }
    );
  }
}
