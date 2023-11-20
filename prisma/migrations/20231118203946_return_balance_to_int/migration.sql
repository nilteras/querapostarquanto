/*
  Warnings:

  - You are about to alter the column `balance` on the `participant` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "participant" ALTER COLUMN "balance" SET DATA TYPE INTEGER;
