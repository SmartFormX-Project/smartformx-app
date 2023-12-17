/*
  Warnings:

  - Added the required column `happyLevel` to the `Analyse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analyse" ADD COLUMN     "happyLevel" INTEGER NOT NULL;
