/*
  Warnings:

  - The `type` column on the `Craft` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Craft" DROP COLUMN "type",
ADD COLUMN     "type" TEXT[];
