/*
  Warnings:

  - Added the required column `pickupAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_locationId_createdAt_idx";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pickupAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Order_locationId_createdAt_pickupAt_idx" ON "Order"("locationId", "createdAt", "pickupAt");
