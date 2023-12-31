/*
  Warnings:

  - You are about to drop the column `feeling` on the `Analyse` table. All the data in the column will be lost.
  - You are about to drop the column `feelingDesc` on the `Analyse` table. All the data in the column will be lost.
  - You are about to drop the column `satisfationLevel` on the `Analyse` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Stats` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Analyse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usage` to the `Analyse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analyse" DROP COLUMN "feeling",
DROP COLUMN "feelingDesc",
DROP COLUMN "satisfationLevel",
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "usage" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "data",
ADD COLUMN     "value" TEXT NOT NULL;
