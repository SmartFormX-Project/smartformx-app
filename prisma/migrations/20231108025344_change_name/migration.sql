/*
  Warnings:

  - You are about to drop the column `answearType` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `type` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "shortId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "answearType",
ADD COLUMN     "type" TEXT NOT NULL;
