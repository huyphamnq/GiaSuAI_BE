import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import verifyFirebaseToken from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lấy danh sách người dùng (lọc theo email, tên, hoặc số điện thoại nếu có)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Lọc theo email
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         description: Lọc theo tên
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         description: Lọc theo số điện thoại
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách user thành công
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Không có hoặc token không hợp lệ
 */

router.get("/users", verifyFirebaseToken, getUsers);

export default router;
