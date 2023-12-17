/*
  Warnings:

  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `maxAnswears` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `maxInsights` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "level",
DROP COLUMN "maxAnswears",
DROP COLUMN "maxInsights",
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "paymentIntentStatus" TEXT;
