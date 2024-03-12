/*
  Warnings:

  - The values [UNABLED] on the enum `AdminStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdminStatus_new" AS ENUM ('ENABLED', 'DISABLED');
ALTER TABLE "Item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "AdminStatus_new" USING ("status"::text::"AdminStatus_new");
ALTER TABLE "Item" ALTER COLUMN "status" TYPE "AdminStatus_new" USING ("status"::text::"AdminStatus_new");
ALTER TYPE "AdminStatus" RENAME TO "AdminStatus_old";
ALTER TYPE "AdminStatus_new" RENAME TO "AdminStatus";
DROP TYPE "AdminStatus_old";
ALTER TABLE "Item" ALTER COLUMN "status" SET DEFAULT 'ENABLED';
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'ENABLED';
COMMIT;

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "status" SET DEFAULT 'ENABLED',
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Suggestion" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tip" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'ENABLED';
