/*
  Warnings:

  - You are about to drop the column `feelingNagative` on the `Analyses` table. All the data in the column will be lost.
  - You are about to drop the column `feelingNagativeDesc` on the `Analyses` table. All the data in the column will be lost.
  - You are about to drop the column `feelingPositive` on the `Analyses` table. All the data in the column will be lost.
  - You are about to drop the column `feelingPositiveDesc` on the `Analyses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analyses" DROP COLUMN "feelingNagative",
DROP COLUMN "feelingNagativeDesc",
DROP COLUMN "feelingPositive",
DROP COLUMN "feelingPositiveDesc",
ADD COLUMN     "feeling" TEXT,
ADD COLUMN     "feelingDesc" TEXT,
ADD COLUMN     "keywords" TEXT[];

-- AlterTable
ALTER TABLE "TopicAnalyses" ADD COLUMN     "analyseId" UUID;

-- CreateTable
CREATE TABLE "Stats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "analyseId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_analyseId_fkey" FOREIGN KEY ("analyseId") REFERENCES "Analyses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicAnalyses" ADD CONSTRAINT "TopicAnalyses_analyseId_fkey" FOREIGN KEY ("analyseId") REFERENCES "Analyses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
