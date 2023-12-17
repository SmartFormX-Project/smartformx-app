/*
  Warnings:

  - Added the required column `goal` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "goal" TEXT NOT NULL;
