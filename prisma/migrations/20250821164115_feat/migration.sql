/*
  Warnings:

  - Added the required column `description` to the `Craft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Craft" ADD COLUMN     "description" TEXT NOT NULL;
