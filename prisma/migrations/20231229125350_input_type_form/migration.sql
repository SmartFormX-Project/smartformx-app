/*
  Warnings:

  - You are about to drop the column `type` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `inputType` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "type",
ADD COLUMN     "inputType" TEXT NOT NULL;
