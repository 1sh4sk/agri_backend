"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const index_1 = require("../index");
class Repository {
    async findFarmerById(farmerId) {
        return index_1.prisma.farmer.findUnique({
            where: { authId: farmerId },
        });
    }
    async findFarmerByAuthId(authId) {
        return index_1.prisma.farmer.findUnique({
            where: { authId },
        });
    }
    async updateBasicDetails(farmerId, data) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                userName: data.userName,
                location: data.location,
                referralCode: data.referralCode,
                updatedAt: new Date(),
            },
        });
    }
    async updateKYCDocuments(farmerId, data) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                aadhaarFrontUrl: data.aadhaarFrontUrl,
                aadhaarBackUrl: data.aadhaarBackUrl,
                panCardUrl: data.panCardUrl,
                govtSchemeProofUrl: data.govtSchemeProofUrl,
                farmerIdProofUrl: data.farmerIdProofUrl,
                kycStatus: data.kycStatus,
                updatedAt: new Date(),
            },
        });
    }
    async updateAadhaarVerification(farmerId, verified) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                aadhaarVerified: verified,
                updatedAt: new Date(),
            },
        });
    }
    async updatePANVerification(farmerId, verified) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                panVerified: verified,
                updatedAt: new Date(),
            },
        });
    }
    async updateKYCStatus(farmerId, status) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                kycStatus: status,
                updatedAt: new Date(),
            },
        });
    }
    async updateFarmerDetails(farmerId, data) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                userName: data.userName,
                preferredLanguage: data.preferredLanguage,
                dob: data.dob ? new Date(data.dob) : undefined,
                farmExperience: data.farmExperience,
                gender: data.gender,
                email: data.email,
                isFpoMember: data.isFpoMember,
                fpoName: data.fpoName,
                fpoRegistrationNumber: data.fpoRegistrationNumber,
                location: data.location,
                referralCode: data.referralCode,
                updatedAt: new Date(),
            },
        });
    }
    async updateFarmDetails(farmerId, data) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                landSize: data.landSize,
                farmingType: data.farmingType,
                updatedAt: new Date(),
            },
        });
    }
    async updateSellingPreferences(farmerId, data) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                sellingPreference: data.sellingPreference,
                preferredMarket: data.preferredMarket,
                updatedAt: new Date(),
            },
        });
    }
    async updateProfilePicture(farmerId, url) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                profilePicture: url,
                updatedAt: new Date(),
            },
        });
    }
    async updateCoverPicture(farmerId, url) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                coverPicture: url,
                updatedAt: new Date(),
            },
        });
    }
    async updateProfileCompletion(farmerId, percentage, isVerified) {
        return index_1.prisma.farmer.update({
            where: { authId: farmerId },
            data: {
                profileCompletionPercentage: percentage,
                isProfileVerified: isVerified,
                updatedAt: new Date(),
            },
        });
    }
    async createCrop(farmerId, data) {
        const farmerExists = await index_1.prisma.farmer.findUnique({
            where: { authId: farmerId },
        });
        if (!farmerExists) {
            throw new Error("Farmer not found");
        }
        return index_1.prisma.crop.create({
            data: {
                farmerId: farmerExists.id,
                cropImage: data.cropImage,
                cropName: data.cropName,
                variety: data.variety,
                availabilityStatus: data.availabilityStatus,
                quantity: data.quantity,
                harvestPeriod: data.harvestPeriod,
                expectedPrice: data.expectedPrice,
            },
        });
    }
    async findCropsByFarmerId(farmerId) {
        const farmerExists = await index_1.prisma.farmer.findUnique({
            where: { authId: farmerId },
        });
        if (!farmerExists) {
            throw new Error("Farmer not found");
        }
        return index_1.prisma.crop.findMany({
            where: { farmerId: farmerExists.id },
            orderBy: { createdAt: "desc" },
        });
    }
    async findCropById(cropId) {
        return index_1.prisma.crop.findUnique({
            where: { id: cropId },
        });
    }
    async updateCrop(cropId, data) {
        return index_1.prisma.crop.update({
            where: { id: cropId },
            data: {
                cropImage: data.cropImage,
                cropName: data.cropName,
                variety: data.variety,
                availabilityStatus: data.availabilityStatus,
                quantity: data.quantity ? Number(data.quantity) : null,
                harvestPeriod: data.harvestPeriod,
                expectedPrice: data.expectedPrice ? Number(data.expectedPrice) : 0,
                updatedAt: new Date(),
            },
        });
    }
    async deleteCrop(cropId) {
        return index_1.prisma.crop.delete({
            where: { id: cropId },
        });
    }
    async createCertificate(farmerId, data) {
        const farmerExists = await index_1.prisma.farmer.findUnique({
            where: { authId: farmerId },
        });
        if (!farmerExists) {
            throw new Error("Farmer not found");
        }
        return index_1.prisma.certificate.create({
            data: {
                farmerId: farmerExists.id,
                title: data.title,
                fileUrl: data.fileUrl,
                fileSize: data.fileSize,
            },
        });
    }
    async findCertificatesByFarmerId(farmerId) {
        return index_1.prisma.certificate.findMany({
            where: { farmerId },
            orderBy: { createdAt: "desc" },
        });
    }
    async deleteCertificate(certificateId) {
        return index_1.prisma.certificate.delete({
            where: { id: certificateId },
        });
    }
    async createAward(farmerId, data) {
        return index_1.prisma.award.create({
            data: {
                farmerId,
                title: data.title,
                fileUrl: data.fileUrl,
                fileSize: data.fileSize,
            },
        });
    }
    async findAwardsByFarmerId(farmerId) {
        return index_1.prisma.award.findMany({
            where: { farmerId },
            orderBy: { createdAt: "desc" },
        });
    }
    async deleteAward(awardId) {
        return index_1.prisma.award.delete({
            where: { id: awardId },
        });
    }
    async createMedia(farmerId, data) {
        return index_1.prisma.media.create({
            data: {
                farmerId,
                mediaType: data.mediaType,
                fileUrl: data.fileUrl,
                fileSize: data.fileSize,
            },
        });
    }
    async findMediaByFarmerId(farmerId) {
        return index_1.prisma.media.findMany({
            where: { farmerId },
            orderBy: { createdAt: "desc" },
        });
    }
    async deleteMedia(mediaId) {
        return index_1.prisma.media.delete({
            where: { id: mediaId },
        });
    }
}
exports.Repository = Repository;
