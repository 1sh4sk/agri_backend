"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const service_1 = require("./service");
const asyncHandler_1 = require("../utils/asyncHandler");
class Controller {
    constructor() {
        this.getProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.getCompleteProfile(farmerId);
            res.status(200).json(result);
        });
        this.getProfileCompletion = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.getProfileCompletionStatus(farmerId);
            res.status(200).json(result);
        });
        this.updateBasicDetails = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            console.log("test 1", farmerId);
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.updateBasicDetails(farmerId, req.body);
            res.status(200).json(result);
        });
        this.uploadKYCDocuments = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            if (!multerReq.uploadedFiles || Object.keys(multerReq.uploadedFiles).length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No files uploaded"
                });
            }
            const result = await this.service.uploadKYCDocuments(farmerId, multerReq.uploadedFiles);
            res.status(200).json(result);
        });
        this.verifyAadhaar = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.verifyAadhaar(farmerId, req.body);
            res.status(200).json(result);
        });
        this.verifyPAN = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.verifyPAN(farmerId, req.body);
            res.status(200).json(result);
        });
        this.updateFarmerDetails = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.updateFarmerDetails(farmerId, req.body);
            res.status(200).json(result);
        });
        this.updateFarmDetails = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.updateFarmDetails(farmerId, req.body);
            res.status(200).json(result);
        });
        this.addCrop = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.addCrop(farmerId, req.body, multerReq.uploadedFiles);
            res.status(201).json(result);
        });
        this.getCrops = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.getCrops(farmerId);
            res.status(200).json(result);
        });
        this.updateCrop = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const { cropId } = req.params;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.updateCrop(farmerId, cropId, req.body, multerReq.uploadedFiles);
            res.status(200).json(result);
        });
        this.deleteCrop = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const { cropId } = req.params;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.deleteCrop(farmerId, cropId);
            res.status(200).json(result);
        });
        this.uploadCertificates = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            if (!multerReq.uploadedFiles?.certificates || multerReq.uploadedFiles.certificates.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No certificates uploaded"
                });
            }
            const result = await this.service.uploadCertificates(farmerId, multerReq.uploadedFiles.certificates);
            res.status(200).json(result);
        });
        this.uploadAwards = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            if (!multerReq.uploadedFiles?.awards || multerReq.uploadedFiles.awards.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No awards uploaded"
                });
            }
            const result = await this.service.uploadAwards(farmerId, multerReq.uploadedFiles.awards);
            res.status(200).json(result);
        });
        this.uploadMedia = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            if (!multerReq.uploadedFiles?.media || multerReq.uploadedFiles.media.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No media uploaded"
                });
            }
            const result = await this.service.uploadMedia(farmerId, multerReq.uploadedFiles.media);
            res.status(200).json(result);
        });
        this.uploadProfilePicture = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            if (!multerReq.uploadedFiles?.profilePicture || multerReq.uploadedFiles.profilePicture.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No profile picture uploaded"
                });
            }
            const result = await this.service.uploadProfilePicture(farmerId, multerReq.uploadedFiles.profilePicture[0]);
            res.status(200).json(result);
        });
        this.uploadCoverPicture = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            const multerReq = req;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            if (!multerReq.uploadedFiles?.coverPicture || multerReq.uploadedFiles.coverPicture.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No cover picture uploaded"
                });
            }
            const result = await this.service.uploadCoverPicture(farmerId, multerReq.uploadedFiles.coverPicture[0]);
            res.status(200).json(result);
        });
        this.updateSellingPreferences = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
            const farmerId = req.user?.id;
            if (!farmerId) {
                return res.status(401).json({
                    success: false,
                    error: "Unauthorized"
                });
            }
            const result = await this.service.updateSellingPreferences(farmerId, req.body);
            res.status(200).json(result);
        });
        this.service = new service_1.Service();
    }
}
exports.Controller = Controller;
