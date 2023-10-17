/*
  Warnings:

  - The `status` column on the `BookAndShedules` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BookAndSheduleStatus" AS ENUM ('active', 'cancel');

-- AlterTable
ALTER TABLE "BookAndShedules" DROP COLUMN "status",
ADD COLUMN     "status" "BookAndSheduleStatus" NOT NULL DEFAULT 'active';
