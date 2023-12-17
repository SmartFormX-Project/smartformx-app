/*
  Warnings:

  - You are about to drop the column `happyLevel` on the `Analyse` table. All the data in the column will be lost.
  - Added the required column `satisfationLevel` to the `Analyse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analyse" DROP COLUMN "happyLevel",
ADD COLUMN     "satisfationLevel" TEXT NOT NULL;
