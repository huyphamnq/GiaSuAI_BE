import express from "express";
import { loginWithFirebase, signupWithFirebase } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập bằng username hoặc email + password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 example: "ironman"
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Đăng nhập thành công"
 *                 idToken:
 *                   type: string
 *                 uid:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Sai username/email hoặc mật khẩu
 */
router.post("/login", loginWithFirebase);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Đăng ký tài khoản mới (Firebase + MongoDB)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *                 example: ironman
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               fullName:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               phoneNumber:
 *                 type: string
 *                 example: 0987654321
 *               role:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 example: student
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 idToken:
 *                   type: string
 *                 uid:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Lỗi dữ liệu gửi lên
 *       409:
 *         description: Email hoặc username đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post("/signup", signupWithFirebase);

export default router;
