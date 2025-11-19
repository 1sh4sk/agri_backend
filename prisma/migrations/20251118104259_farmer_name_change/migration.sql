/*
  Warnings:

  - You are about to drop the `formers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "formers" DROP CONSTRAINT "formers_authId_fkey";

-- DropTable
DROP TABLE "formers";

-- CreateTable
CREATE TABLE "farmers" (
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

    CONSTRAINT "farmers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "farmers_authId_key" ON "farmers"("authId");

-- AddForeignKey
ALTER TABLE "farmers" ADD CONSTRAINT "farmers_authId_fkey" FOREIGN KEY ("authId") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
