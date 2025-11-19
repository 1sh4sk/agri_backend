/*
  Warnings:

  - You are about to drop the column `emailOtp` on the `temp_auth` table. All the data in the column will be lost.
  - You are about to drop the `business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `former` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `individual` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `temp_auth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "government_officials_authId_idx";

-- DropIndex
DROP INDEX "professionals_authId_idx";

-- DropIndex
DROP INDEX "temp_auth_createdAt_idx";

-- AlterTable
ALTER TABLE "auth" ADD COLUMN     "emailOtp" TEXT,
ADD COLUMN     "emailOtpExpiry" TIMESTAMP(3),
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneVerified" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "government_officials" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "professionals" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "temp_auth" DROP COLUMN "emailOtp",
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "expiresAt" DROP DEFAULT;

-- DropTable
DROP TABLE "business";

-- DropTable
DROP TABLE "former";

-- DropTable
DROP TABLE "individual";

-- CreateTable
CREATE TABLE "formers" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "farmSize" DOUBLE PRECISION,
    "location" TEXT,
    "crops" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individuals" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "interests" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "individuals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "businessName" TEXT,
    "businessType" TEXT,
    "registrationNo" TEXT,
    "address" TEXT,
    "website" TEXT,
    "employeeCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "formers_authId_key" ON "formers"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "individuals_authId_key" ON "individuals"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "businesses_authId_key" ON "businesses"("authId");

-- CreateIndex
CREATE INDEX "auth_email_idx" ON "auth"("email");

-- CreateIndex
CREATE INDEX "auth_phoneNumber_idx" ON "auth"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "temp_auth_phoneNumber_key" ON "temp_auth"("phoneNumber");

-- CreateIndex
CREATE INDEX "temp_auth_phoneNumber_idx" ON "temp_auth"("phoneNumber");

-- CreateIndex
CREATE INDEX "temp_auth_expiresAt_idx" ON "temp_auth"("expiresAt");

-- AddForeignKey
ALTER TABLE "formers" ADD CONSTRAINT "formers_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "individuals" ADD CONSTRAINT "individuals_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "government_officials" ADD CONSTRAINT "government_officials_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
