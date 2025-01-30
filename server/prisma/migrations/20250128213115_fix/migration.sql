/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Device` table. All the data in the column will be lost.
  - Added the required column `deviceId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_reviewId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "reviewId";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "deviceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
