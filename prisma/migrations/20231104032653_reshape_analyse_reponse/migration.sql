/*
  Warnings:

  - You are about to drop the `Analyses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analyses" DROP CONSTRAINT "Analyses_formId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_analyseId_fkey";

-- DropForeignKey
ALTER TABLE "TopicAnalyses" DROP CONSTRAINT "TopicAnalyses_analyseId_fkey";

-- DropTable
DROP TABLE "Analyses";

-- CreateTable
CREATE TABLE "Analyse" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "formId" UUID NOT NULL,
    "feeling" TEXT,
    "feelingDesc" TEXT,
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Analyse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analyse_formId_key" ON "Analyse"("formId");

-- AddForeignKey
ALTER TABLE "Analyse" ADD CONSTRAINT "Analyse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_analyseId_fkey" FOREIGN KEY ("analyseId") REFERENCES "Analyse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicAnalyses" ADD CONSTRAINT "TopicAnalyses_analyseId_fkey" FOREIGN KEY ("analyseId") REFERENCES "Analyse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
