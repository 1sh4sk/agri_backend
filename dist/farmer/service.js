"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const repository_1 = require("./repository");
const customError_1 = require("../utils/customError");
const s3Client_1 = require("../utils/s3Client");
class Service {
    constructor() {
        this.PROFILE_COMPLETION_CONFIG = {
            mandatory: {
                basicDetails: 15,
                kycVerification: 15,
                farmerDetails: 10,
                farmDetails: 15,
                cropsAvailability: 10,
            },
            optional: {
                certificates: 5,
                awards: 5,
                sellingPreferences: 5,
                media: 5,
            }
        };
        this.repository = new repository_1.Repository();
    }
    async calculateProfileCompletion(farmerId) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        let completionPercentage = 0;
        const completedSections = [];
        const pendingSections = [];
        const mandatorySections = [
            {
                sectionName: 'basicDetails',
                isCompleted: !!(profile.fullName && profile.phoneNumber && profile.location),
                isMandatory: true,
                percentage: 15
            },
            {
                sectionName: 'kycVerification',
                isCompleted: profile.kycStatus === 'Verified',
                isMandatory: true,
                percentage: 15
            },
            {
                sectionName: 'farmerDetails',
                isCompleted: !!(profile.preferredLanguage &&
                    profile.dob &&
                    profile.farmExperience !== null &&
                    profile.gender),
                isMandatory: true,
                percentage: 10
            },
            {
                sectionName: 'farmDetails',
                isCompleted: !!(profile.landSize && profile.farmingType),
                isMandatory: true,
                percentage: 15
            }
        ];
        const crops = await this.repository.findCropsByFarmerId(farmerId);
        mandatorySections.push({
            sectionName: 'cropsAvailability',
            isCompleted: crops.length > 0,
            isMandatory: true,
            percentage: 10
        });
        mandatorySections.forEach(section => {
            if (section.isCompleted) {
                completionPercentage += section.percentage;
                completedSections.push(section.sectionName);
            }
            else {
                pendingSections.push(section.sectionName);
            }
        });
        const certificates = await this.repository.findCertificatesByFarmerId(farmerId);
        const awards = await this.repository.findAwardsByFarmerId(farmerId);
        const media = await this.repository.findMediaByFarmerId(farmerId);
        const optionalSectionsCompleted = [];
        if (certificates.length > 0)
            optionalSectionsCompleted.push('certificates');
        if (awards.length > 0)
            optionalSectionsCompleted.push('awards');
        if (profile.sellingPreference)
            optionalSectionsCompleted.push('sellingPreferences');
        if (media.length > 0)
            optionalSectionsCompleted.push('media');
        const optionalPercentage = Math.min(optionalSectionsCompleted.length * 5, 10);
        completionPercentage += optionalPercentage;
        completedSections.push(...optionalSectionsCompleted);
        const isProfileVerified = completionPercentage >= 100;
        await this.repository.updateProfileCompletion(farmerId, completionPercentage, isProfileVerified);
        return {
            profileCompletionPercentage: completionPercentage,
            isProfileVerified,
            completedSections,
            pendingSections
        };
    }
    async updateBasicDetails(farmerId, payload) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const updated = await this.repository.updateBasicDetails(farmerId, {
            fullName: payload.fullName,
            location: payload.location,
            referralCode: payload.referralCode
        });
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Basic details updated successfully",
            data: {
                profile: updated,
                ...completion
            }
        };
    }
    async verifyAadhaarMock(aadhaarNumber) {
        console.log(`🔍 MOCK AADHAAR VERIFICATION: ${aadhaarNumber}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            verified: true,
            data: {
                name: "John Doe",
                dob: "1990-01-01",
                address: "Sample Address, City, State"
            }
        };
    }
    async verifyPANMock(panNumber) {
        console.log(`🔍 MOCK PAN VERIFICATION: ${panNumber}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            verified: true,
            data: {
                name: "John Doe",
                panNumber: panNumber
            }
        };
    }
    async uploadKYCDocuments(farmerId, files) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const uploadedUrls = {};
        if (files.aadhaarFront && files.aadhaarFront.length > 0) {
            const result = await (0, s3Client_1.uploadFile)(files.aadhaarFront[0], '/kyc/aadhaar/');
            uploadedUrls.aadhaarFrontUrl = result.url;
        }
        if (files.aadhaarBack && files.aadhaarBack.length > 0) {
            const result = await (0, s3Client_1.uploadFile)(files.aadhaarBack[0], '/kyc/aadhaar/');
            uploadedUrls.aadhaarBackUrl = result.url;
        }
        if (files.panCard && files.panCard.length > 0) {
            const result = await (0, s3Client_1.uploadFile)(files.panCard[0], '/kyc/pan/');
            uploadedUrls.panCardUrl = result.url;
        }
        if (files.govtSchemeProof && files.govtSchemeProof.length > 0) {
            const result = await (0, s3Client_1.uploadFile)(files.govtSchemeProof[0], '/kyc/govt/');
            uploadedUrls.govtSchemeProofUrl = result.url;
        }
        if (files.farmerIdProof && files.farmerIdProof.length > 0) {
            const result = await (0, s3Client_1.uploadFile)(files.farmerIdProof[0], '/kyc/farmer-id/');
            uploadedUrls.farmerIdProofUrl = result.url;
        }
        uploadedUrls.kycStatus = 'Pending';
        const updated = await this.repository.updateKYCDocuments(farmerId, uploadedUrls);
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "KYC documents uploaded successfully. Verification in progress.",
            data: {
                profile: updated,
                ...completion
            }
        };
    }
    async verifyAadhaar(farmerId, payload) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        if (!profile.aadhaarFrontUrl || !profile.aadhaarBackUrl) {
            throw new customError_1.CustomError("Please upload Aadhaar documents first", 400);
        }
        const verification = await this.verifyAadhaarMock(payload.aadhaarNumber);
        if (verification.verified) {
            await this.repository.updateAadhaarVerification(farmerId, true);
        }
        return {
            success: true,
            message: "Aadhaar verified successfully",
            data: verification.data
        };
    }
    async verifyPAN(farmerId, payload) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        if (!profile.panCardUrl) {
            throw new customError_1.CustomError("Please upload PAN card first", 400);
        }
        const verification = await this.verifyPANMock(payload.panNumber);
        if (verification.verified) {
            await this.repository.updatePANVerification(farmerId, true);
            if (profile.aadhaarVerified) {
                await this.repository.updateKYCStatus(farmerId, 'Verified');
            }
        }
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "PAN verified successfully",
            data: {
                ...verification.data,
                ...completion
            }
        };
    }
    async updateFarmerDetails(farmerId, payload) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        if (payload.isFpoMember) {
            if (!payload.fpoName || !payload.fpoRegistrationNumber) {
                throw new customError_1.CustomError("FPO Name and Registration Number are required when member of FPO", 400);
            }
        }
        const updated = await this.repository.updateFarmerDetails(farmerId, {
            fullName: payload.fullName,
            location: payload.location,
            preferredLanguage: payload.preferredLanguage,
            dob: payload.dob,
            farmExperience: payload.farmExperience,
            gender: payload.gender,
            email: payload.email,
            isFpoMember: payload.isFpoMember,
            fpoName: payload.fpoName,
            fpoRegistrationNumber: payload.fpoRegistrationNumber,
            referralCode: payload.referralCode
        });
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Farmer details updated successfully",
            data: {
                profile: updated,
                ...completion
            }
        };
    }
    async updateFarmDetails(farmerId, payload) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const updated = await this.repository.updateFarmDetails(farmerId, payload);
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Farm details updated successfully",
            data: {
                profile: updated,
                ...completion
            }
        };
    }
    async addCrop(farmerId, payload, files) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        if (payload.availabilityStatus === 'Available' && !payload.quantity) {
            throw new customError_1.CustomError("Quantity is required when crop is available", 400);
        }
        let cropImageUrl;
        if (files?.cropImage && files.cropImage.length > 0) {
            const result = await (0, s3Client_1.uploadFile)(files.cropImage[0], '/crops/');
            cropImageUrl = result.url;
        }
        const crop = await this.repository.createCrop(farmerId, {
            ...payload,
            cropImage: cropImageUrl
        });
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Crop added successfully",
            data: {
                crop,
                ...completion
            }
        };
    }
    async getCrops(farmerId) {
        const crops = await this.repository.findCropsByFarmerId(farmerId);
        return {
            success: true,
            data: {
                crops
            }
        };
    }
    async updateCrop(farmerId, cropId, payload, files) {
        const crop = await this.repository.findCropById(cropId);
        if (!crop || crop.farmerId !== farmerId) {
            throw new customError_1.CustomError("Crop not found", 404);
        }
        let cropImageUrl;
        if (files?.cropImage && files.cropImage.length > 0) {
            const result = await (0, s3Client_1.uploadFile)(files.cropImage[0], '/crops/');
            cropImageUrl = result.url;
        }
        const updated = await this.repository.updateCrop(cropId, {
            ...payload,
            cropImage: cropImageUrl || crop.cropImage
        });
        return {
            success: true,
            message: "Crop updated successfully",
            data: {
                crop: updated
            }
        };
    }
    async deleteCrop(farmerId, cropId) {
        const crop = await this.repository.findCropById(cropId);
        if (!crop || crop.farmerId !== farmerId) {
            throw new customError_1.CustomError("Crop not found", 404);
        }
        await this.repository.deleteCrop(cropId);
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Crop deleted successfully",
            data: completion
        };
    }
    async uploadCertificates(farmerId, files) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const uploadResults = await (0, s3Client_1.uploadMultipleFiles)(files, '/certificates/');
        const certificates = await Promise.all(uploadResults.map(result => this.repository.createCertificate(farmerId, {
            title: result.originalName,
            fileUrl: result.url,
            fileSize: files.find(f => f.originalname === result.originalName)?.size || 0
        })));
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Certificates uploaded successfully",
            data: {
                certificates,
                ...completion
            }
        };
    }
    async uploadAwards(farmerId, files) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const uploadResults = await (0, s3Client_1.uploadMultipleFiles)(files, '/awards/');
        const awards = await Promise.all(uploadResults.map(result => this.repository.createAward(farmerId, {
            title: result.originalName,
            fileUrl: result.url,
            fileSize: files.find(f => f.originalname === result.originalName)?.size || 0
        })));
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Awards uploaded successfully",
            data: {
                awards,
                ...completion
            }
        };
    }
    async uploadMedia(farmerId, files) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const uploadResults = await (0, s3Client_1.uploadMultipleFiles)(files, '/media/');
        const media = await Promise.all(uploadResults.map(result => {
            const file = files.find(f => f.originalname === result.originalName);
            const mediaType = file?.mimetype.startsWith('video/') ? 'Video' : 'Image';
            return this.repository.createMedia(farmerId, {
                mediaType,
                fileUrl: result.url,
                fileSize: file?.size || 0
            });
        }));
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Media uploaded successfully",
            data: {
                media,
                ...completion
            }
        };
    }
    async uploadProfilePicture(farmerId, file) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const result = await (0, s3Client_1.uploadFile)(file, '/profile/');
        const updated = await this.repository.updateProfilePicture(farmerId, result.url);
        return {
            success: true,
            message: "Profile picture uploaded successfully",
            data: {
                profilePicture: result.url,
                profile: updated
            }
        };
    }
    async uploadCoverPicture(farmerId, file) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const result = await (0, s3Client_1.uploadFile)(file, '/cover/');
        const updated = await this.repository.updateCoverPicture(farmerId, result.url);
        return {
            success: true,
            message: "Cover picture uploaded successfully",
            data: {
                coverPicture: result.url,
                profile: updated
            }
        };
    }
    async updateSellingPreferences(farmerId, payload) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const updated = await this.repository.updateSellingPreferences(farmerId, payload);
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            message: "Selling preferences updated successfully",
            data: {
                profile: updated,
                ...completion
            }
        };
    }
    async getCompleteProfile(farmerId) {
        const profile = await this.repository.findFarmerByAuthId(farmerId);
        if (!profile) {
            throw new customError_1.CustomError("Farmer profile not found", 404);
        }
        const crops = await this.repository.findCropsByFarmerId(farmerId);
        const certificates = await this.repository.findCertificatesByFarmerId(farmerId);
        const awards = await this.repository.findAwardsByFarmerId(farmerId);
        const media = await this.repository.findMediaByFarmerId(farmerId);
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            data: {
                profile,
                crops,
                certificates,
                awards,
                media,
                ...completion
            }
        };
    }
    async getProfileCompletionStatus(farmerId) {
        const completion = await this.calculateProfileCompletion(farmerId);
        return {
            success: true,
            data: completion
        };
    }
}
exports.Service = Service;
