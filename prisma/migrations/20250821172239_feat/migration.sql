/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Craft` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Craft_slug_key" ON "public"."Craft"("slug");
