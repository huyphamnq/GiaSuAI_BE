import express from "express";
import { createCourse, getCourses } from "../controllers/course.controller.js";
import verifyFirebaseToken from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Tạo một khoá học mới
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "NodeJS cơ bản"
 *               description:
 *                 type: string
 *                 example: "Khoá học giới thiệu NodeJS"
 *               status:
 *                 type: string
 *                 enum: [pending, active, disabled]
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Tạo khoá học thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Thiếu thông tin bắt buộc
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/courses", verifyFirebaseToken, createCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Lấy danh sách khoá học
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách khoá học
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lấy danh sách khoá học thành công
 *                 courses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 *       401:
 *         description: Không có hoặc token không hợp lệ
 */
router.get("/courses", verifyFirebaseToken, getCourses);

export default router;
