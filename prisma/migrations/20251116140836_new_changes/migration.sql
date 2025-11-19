-- CreateTable
CREATE TABLE "auth" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "loginOtp" TEXT,
    "loginOtpExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temp_auth" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "emailOtp" TEXT NOT NULL,
    "smsOtp" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "temp_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "former" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "farmSize" DOUBLE PRECISION,
    "location" TEXT,
    "crops" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "former_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "individual" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "interests" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "individual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
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

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionals" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "profession" TEXT,
    "qualification" TEXT,
    "experience" INTEGER,
    "specialization" TEXT[],
    "licenseNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "government_officials" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "department" TEXT,
    "designation" TEXT,
    "employeeId" TEXT,
    "office" TEXT,
    "jurisdiction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "government_officials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_phoneNumber_key" ON "auth"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "temp_auth_email_key" ON "temp_auth"("email");

-- CreateIndex
CREATE INDEX "temp_auth_createdAt_idx" ON "temp_auth"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "former_authId_key" ON "former"("authId");

-- CreateIndex
CREATE INDEX "former_authId_idx" ON "former"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "individual_authId_key" ON "individual"("authId");

-- CreateIndex
CREATE INDEX "individual_authId_idx" ON "individual"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "business_authId_key" ON "business"("authId");

-- CreateIndex
CREATE INDEX "business_authId_idx" ON "business"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_authId_key" ON "professionals"("authId");

-- CreateIndex
CREATE INDEX "professionals_authId_idx" ON "professionals"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "government_officials_authId_key" ON "government_officials"("authId");

-- CreateIndex
CREATE INDEX "government_officials_authId_idx" ON "government_officials"("authId");
