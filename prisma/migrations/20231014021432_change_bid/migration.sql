/*
  Warnings:

  - You are about to drop the column `userId` on the `business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "business" DROP CONSTRAINT "business_userId_fkey";

-- DropIndex
DROP INDEX "business_userId_key";

-- AlterTable
ALTER TABLE "business" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "businessId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_businessId_key" ON "User"("businessId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
