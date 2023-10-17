/*
  Warnings:

  - You are about to drop the column `rating` on the `reviews` table. All the data in the column will be lost.
  - Made the column `comment` on table `reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "rating",
ALTER COLUMN "comment" SET NOT NULL;
