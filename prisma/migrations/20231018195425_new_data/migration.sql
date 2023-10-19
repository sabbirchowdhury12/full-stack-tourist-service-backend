/*
  Warnings:

  - Changed the type of `category` on the `services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('hotel', 'car', 'tour');

-- AlterTable
ALTER TABLE "services" DROP COLUMN "category",
ADD COLUMN     "category" "ServiceCategory" NOT NULL;
