const axios = require("axios");
const User = require("../models/User");
const admin = require("../configs/firebaseAdmin");

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

// -------------------- LOGIN --------------------
const loginWithFirebase = async (req, res) => {
  const { email, password } = req.body;

  try {
    const firebaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

    const response = await axios.post(firebaseUrl, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, localId: uid } = response.data;

    return res.status(200).json({
      message: "Đăng nhập thành công",
      idToken,
      refreshToken,
      uid,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Đăng nhập thất bại",
      error: err.response?.data || err.message,
    });
  }
};

// -------------------- SIGNUP --------------------
const signupWithFirebase = async (req, res) => {
  const { email, password, fullName, phoneNumber, role } = req.body;

  let firebaseUID = null;

  try {
    // 1. Tạo tài khoản Firebase
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );

    const { idToken, refreshToken, localId } = response.data;
    firebaseUID = localId;

    if (!firebaseUID) {
      return res.status(500).json({ message: "Không lấy được Firebase UID" });
    }

    // 2. Role an toàn
    const allowedRoles = ["student", "tutor"];
    const safeRole = allowedRoles.includes(role) ? role : "student";

    // 3. Lưu vào MongoDB
    await User.create({
      firebaseUid: firebaseUID,
      email,
      fullName,
      phoneNumber,
      role: safeRole,
    });

    // 4. Trả về kết quả
    return res.status(200).json({
      message: "Đăng ký thành công",
      idToken,
      refreshToken,
      uid: firebaseUID,
    });
  } catch (error) {
    const isDuplicateKey =
      error?.message?.includes("E11000") || error?.code === 11000;

    // Nếu Firebase tạo thành công nhưng MongoDB lỗi → rollback Firebase
    if (firebaseUID && isDuplicateKey) {
      try {
        await admin.auth().deleteUser(firebaseUID);
        console.log("🔥 Đã rollback Firebase vì MongoDB lỗi");
      } catch (deleteErr) {
        console.error("❌ Không thể xoá Firebase user:", deleteErr.message);
      }
    }

    return res.status(400).json({
      message: "Đăng ký thất bại",
      error: error.response?.data || error.message,
    });
  }
};

// -------------------- EXPORT --------------------
module.exports = {
  loginWithFirebase,
  signupWithFirebase,
};
