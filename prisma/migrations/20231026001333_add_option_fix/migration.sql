/*
  Warnings:

  - You are about to drop the column `options` on the `Answears` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answears" DROP COLUMN "options";

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "options" TEXT[];
