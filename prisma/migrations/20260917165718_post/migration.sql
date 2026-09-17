-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'VERIFIED');

-- AlterTable
ALTER TABLE "SavingsPost" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
