/*
  Warnings:

  - You are about to drop the column `crops` on the `farmers` table. All the data in the column will be lost.
  - You are about to drop the column `farmSize` on the `farmers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "farmers" DROP COLUMN "crops",
DROP COLUMN "farmSize",
ADD COLUMN     "aadhaarBackUrl" TEXT,
ADD COLUMN     "aadhaarFrontUrl" TEXT,
ADD COLUMN     "aadhaarVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coverPicture" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "farmExperience" INTEGER,
ADD COLUMN     "farmerIdProofUrl" TEXT,
ADD COLUMN     "farmingType" TEXT,
ADD COLUMN     "fpoName" TEXT,
ADD COLUMN     "fpoRegistrationNumber" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "govtSchemeProofUrl" TEXT,
ADD COLUMN     "isFpoMember" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isProfileVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kycStatus" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "landSize" DOUBLE PRECISION,
ADD COLUMN     "panCardUrl" TEXT,
ADD COLUMN     "panVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferredLanguage" TEXT,
ADD COLUMN     "preferredMarket" TEXT,
ADD COLUMN     "profileCompletionPercentage" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "referralCode" TEXT,
ADD COLUMN     "sellingPreference" TEXT;

-- CreateTable
CREATE TABLE "crops" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "cropImage" TEXT,
    "cropName" TEXT NOT NULL,
    "variety" TEXT NOT NULL,
    "availabilityStatus" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION,
    "harvestPeriod" TEXT NOT NULL,
    "expectedPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "awards" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "crops_farmerId_idx" ON "crops"("farmerId");

-- CreateIndex
CREATE INDEX "certificates_farmerId_idx" ON "certificates"("farmerId");

-- CreateIndex
CREATE INDEX "awards_farmerId_idx" ON "awards"("farmerId");

-- CreateIndex
CREATE INDEX "media_farmerId_idx" ON "media"("farmerId");

-- CreateIndex
CREATE INDEX "farmers_authId_idx" ON "farmers"("authId");

-- CreateIndex
CREATE INDEX "farmers_profileCompletionPercentage_idx" ON "farmers"("profileCompletionPercentage");

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "awards" ADD CONSTRAINT "awards_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
