-- Agregar campo slug al modelo de perfil
ALTER TABLE "profiles" ADD COLUMN "slug" TEXT;
CREATE UNIQUE INDEX "profiles_slug_key" ON "profiles"("slug");
