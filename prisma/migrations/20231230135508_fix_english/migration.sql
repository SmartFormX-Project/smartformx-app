/*
  Warnings:

  - You are about to drop the `Answears` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnswear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answears" DROP CONSTRAINT "Answears_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Answears" DROP CONSTRAINT "Answears_userAwnsearId_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswear" DROP CONSTRAINT "UserAnswear_formId_fkey";

-- DropTable
DROP TABLE "Answears";

-- DropTable
DROP TABLE "UserAnswear";

-- CreateTable
CREATE TABLE "UserAnswers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "referenceCode" TEXT NOT NULL,
    "formId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "questionId" UUID NOT NULL,
    "userAwnsearId" UUID NOT NULL,
    "answear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswers_referenceCode_key" ON "UserAnswers"("referenceCode");

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_userAwnsearId_fkey" FOREIGN KEY ("userAwnsearId") REFERENCES "UserAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
