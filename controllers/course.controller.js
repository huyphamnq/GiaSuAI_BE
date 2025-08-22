import Course from "../models/Courses.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Tạo khoá học
export const createCourse = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ error: "Title là bắt buộc!" });

    const user = req.user; // ✅ lấy từ middleware
    if (!user) return res.status(401).json({ error: "Missing token" });

    const newCourse = new Course({
      title,
      description,
      created_By: user._id, // ObjectId hợp lệ
      status,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Tạo khoá học thất bại!" });
  }
};

// Lấy danh sách khoá học
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "created_By",
      "userName fullName email"
    );
    res
      .status(200)
      .json({ message: "Lấy danh sách khoá học thành công", courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lấy khoá học thất bại" });
  }
};
