/*
  Warnings:

  - You are about to drop the column `ratingId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reviewId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_ratingId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "ratingId",
ADD COLUMN     "reviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL;

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "rate" INTEGER NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
