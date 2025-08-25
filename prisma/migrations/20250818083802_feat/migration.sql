/*
  Warnings:

  - You are about to drop the column `image` on the `Craft` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Craft" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
