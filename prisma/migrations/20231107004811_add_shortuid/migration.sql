/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "shortId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Form_shortId_key" ON "Form"("shortId");
