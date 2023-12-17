/*
  Warnings:

  - You are about to drop the column `registrationCompleted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "registrationCompleted",
ADD COLUMN     "subscribed" BOOLEAN NOT NULL DEFAULT false;
