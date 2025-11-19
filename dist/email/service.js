"use strict";
// import nodemailer from 'nodemailer';
// import envConfig from '@/config/env';
// import logger from '@/utils/logger';
// export class EmailService {
//   private transporter: nodemailer.Transporter;
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: envConfig.smtp.user,
//         pass: envConfig.smtp.pass
//       }
//     });
//   }
//   async sendOtpEmail(email: string, otp: string, userName: string): Promise<void> {
//     try {
//       await this.transporter.sendMail({
//         from: `"Your App Name" <${envConfig.smtp.user}>`,
//         to: email,
//         subject: 'Your OTP Verification Code',
//         html: `
//           <div style="font-family: Arial, sans-serif; padding: 20px;">
//             <h2>Hello ${userName},</h2>
//             <p>Your OTP verification code is:</p>
//             <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
//             <p>This code will expire in 10 minutes.</p>
//             <p>If you didn't request this code, please ignore this email.</p>
//           </div>
//         `
//       });
//       logger.info(`OTP email sent to ${email}`);
//     } catch (error) {
//       logger.error('Failed to send OTP email:', error);
//       throw new Error('Failed to send OTP email');
//     }
//   }
// }
