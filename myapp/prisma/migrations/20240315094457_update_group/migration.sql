/*
  Warnings:

  - Made the column `updatedAt` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Step` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Suggestion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Tip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "GroupOnQuestion" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Suggestion" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tip" ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
