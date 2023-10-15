/*
  Warnings:

  - Added the required column `status` to the `BookAndShedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookAndShedules" ADD COLUMN     "status" TEXT NOT NULL;
