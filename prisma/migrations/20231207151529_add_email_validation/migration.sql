-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tempToken" TEXT,
ADD COLUMN     "verifiedEmail" BOOLEAN NOT NULL DEFAULT false;
