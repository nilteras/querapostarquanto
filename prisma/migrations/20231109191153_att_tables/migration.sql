/*
  Warnings:

  - You are about to drop the `bet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bet" DROP CONSTRAINT "bet_gameId_fkey";

-- DropForeignKey
ALTER TABLE "bet" DROP CONSTRAINT "bet_participantId_fkey";

-- DropTable
DROP TABLE "bet";

-- DropTable
DROP TABLE "game";

-- DropTable
DROP TABLE "participant";
