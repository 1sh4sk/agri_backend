"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const index_1 = require("../index");
class Repository {
    async findAuthByEmail(email) {
        return index_1.prisma.auth.findUnique({
            where: { email },
        });
    }
    async findAuthByPhone(phoneNumber) {
        return index_1.prisma.auth.findUnique({
            where: { phoneNumber },
        });
    }
    async findAuthByEmailOrPhone(email, phoneNumber) {
        return index_1.prisma.auth.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }],
            },
        });
    }
    async findAuthById(id) {
        return index_1.prisma.auth.findUnique({
            where: { id },
        });
    }
    async findAuthByIdentifier(identifier) {
        return index_1.prisma.auth.findFirst({
            where: {
                OR: [{ email: identifier }, { phoneNumber: identifier }],
            },
        });
    }
    async createTempAuth(data) {
        return index_1.prisma.tempAuth.upsert({
            where: { phoneNumber: data.phoneNumber },
            update: data,
            create: data,
        });
    }
    async updateTempAuthOtp(phoneNumber, smsOtp) {
        return index_1.prisma.tempAuth.update({
            where: { phoneNumber },
            data: {
                smsOtp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            },
        });
    }
    async findTempByPhone(phoneNumber) {
        return index_1.prisma.tempAuth.findUnique({
            where: { phoneNumber },
        });
    }
    async findTempByEmail(email) {
        return index_1.prisma.tempAuth.findUnique({
            where: { email },
        });
    }
    async deleteTempAuth(phoneNumber) {
        return index_1.prisma.tempAuth.delete({
            where: { phoneNumber },
        });
    }
    async createAuth(data) {
        return index_1.prisma.auth.create({
            data,
        });
    }
    async updateEmailOtp(authId, email, otp) {
        return index_1.prisma.auth.update({
            where: { id: authId },
            data: {
                email,
                emailOtp: otp,
                emailOtpExpiry: new Date(Date.now() + 10 * 60 * 1000)
            },
        });
    }
    async clearEmailOtp(authId) {
        return index_1.prisma.auth.update({
            where: { id: authId },
            data: {
                emailOtp: null,
                emailOtpExpiry: null
            },
        });
    }
    async verifyEmail(authId) {
        return index_1.prisma.auth.update({
            where: { id: authId },
            data: {
                emailVerified: true,
                emailOtp: null,
                emailOtpExpiry: null
            },
        });
    }
    async updateLoginOtp(authId, otp) {
        return index_1.prisma.auth.update({
            where: { id: authId },
            data: {
                loginOtp: otp,
                loginOtpExpiry: new Date(Date.now() + 10 * 60 * 1000)
            },
        });
    }
    async clearLoginOtp(authId) {
        return index_1.prisma.auth.update({
            where: { id: authId },
            data: {
                loginOtp: null,
                loginOtpExpiry: null
            },
        });
    }
    async createRoleBasedUser(role, data) {
        switch (role) {
            case 'farmer':
                return index_1.prisma.farmer.create({ data });
            case 'individual':
                return index_1.prisma.individual.create({ data });
            case 'business':
                return index_1.prisma.business.create({ data });
            case 'professionals':
                return index_1.prisma.professionals.create({ data });
            case 'government officials':
                return index_1.prisma.governmentOfficials.create({ data });
            default:
                throw new Error(`Unknown role: ${role}`);
        }
    }
    async findRoleBasedUser(role, authId) {
        switch (role) {
            case 'farmer':
                return index_1.prisma.farmer.findUnique({ where: { authId } });
            case 'individual':
                return index_1.prisma.individual.findUnique({ where: { authId } });
            case 'business':
                return index_1.prisma.business.findUnique({ where: { authId } });
            case 'professionals':
                return index_1.prisma.professionals.findUnique({ where: { authId } });
            case 'government officials':
                return index_1.prisma.governmentOfficials.findUnique({ where: { authId } });
            default:
                throw new Error(`Unknown role: ${role}`);
        }
    }
}
exports.Repository = Repository;
