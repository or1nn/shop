/*
  Warnings:

  - Made the column `reviewId` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_reviewId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "reviewId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
