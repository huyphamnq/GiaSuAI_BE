const express = require("express");
const {
  loginWithFirebase,
  signupWithFirebase,
} = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập với Firebase email & password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Sai email hoặc mật khẩu
 */
router.post("/login", loginWithFirebase);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Đăng ký tài khoản với Firebase email & password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - fullName
 *             properties:
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
 *                 enum: [student, tutor, admin]
 *                 example: student
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi đăng ký
 */
router.post("/signup", signupWithFirebase);

module.exports = router;
