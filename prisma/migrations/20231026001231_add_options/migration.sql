-- AlterTable
ALTER TABLE "Answears" ADD COLUMN     "options" TEXT[];

-- AddForeignKey
ALTER TABLE "Answears" ADD CONSTRAINT "Answears_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
