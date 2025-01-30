-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_reviewId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "reviewId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
