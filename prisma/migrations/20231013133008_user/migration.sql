/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `contactNo` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "contactNo",
ALTER COLUMN "role" SET DEFAULT 'user';
