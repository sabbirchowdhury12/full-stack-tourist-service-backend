/*
  Warnings:

  - The values [active,cancel] on the enum `BookAndSheduleStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookAndSheduleStatus_new" AS ENUM ('pending', 'confirmed', 'canceled');
ALTER TABLE "BookAndShedules" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BookAndShedules" ALTER COLUMN "status" TYPE "BookAndSheduleStatus_new" USING ("status"::text::"BookAndSheduleStatus_new");
ALTER TYPE "BookAndSheduleStatus" RENAME TO "BookAndSheduleStatus_old";
ALTER TYPE "BookAndSheduleStatus_new" RENAME TO "BookAndSheduleStatus";
DROP TYPE "BookAndSheduleStatus_old";
ALTER TABLE "BookAndShedules" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "BookAndShedules" ALTER COLUMN "status" SET DEFAULT 'pending';
