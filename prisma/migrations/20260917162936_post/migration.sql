/*
  Warnings:

  - Added the required column `proof` to the `SavingsPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavingsPost" ADD COLUMN     "proof" TEXT NOT NULL;
