/*
  Warnings:

  - Made the column `name` on table `Craft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Craft` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Craft_email_key";

-- AlterTable
ALTER TABLE "public"."Craft" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
