import axios from "axios";
import User from "../models/User.js";
import admin from "../configs/firebaseAdmin.js";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

// -------------------- LOGIN --------------------
const loginWithFirebase = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const trimmedIdentifier = identifier.trim();
    let email = trimmedIdentifier;
    let userDoc = null;

    if (!trimmedIdentifier.includes("@")) {
      userDoc = await User.findOne({ userName: trimmedIdentifier });
      if (!userDoc)
        return res.status(404).json({ message: "Username không tồn tại" });
      email = userDoc.email;
    }

    const firebaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const response = await axios.post(firebaseUrl, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, localId: uid } = response.data;

    if (!userDoc) {
      userDoc = await User.findOne({ email });
      if (!userDoc)
        return res
          .status(404)
          .json({ message: "Email không tồn tại trong hệ thống" });
    }

    res.status(200).json({
      message: "Đăng nhập thành công",
      idToken,
      uid,
      user: {
        userName: userDoc.userName,
        fullName: userDoc.fullName,
        email: userDoc.email,
        phoneNumber: userDoc.phoneNumber,
        role: userDoc.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    res.status(401).json({ message: "Đăng nhập thất bại" });
  }
};

// -------------------- SIGNUP --------------------
const signupWithFirebase = async (req, res) => {
  const { userName, fullName, email, password, phoneNumber, role } = req.body;

  // Log dữ liệu nhận được từ client
  console.log("🔥 Dữ liệu signup từ client:", {
    userName,
    fullName,
    email,
    password: password ? "***" : null, // ẩn password cho an toàn
    phoneNumber,
    role,
  });

  const trimmedEmail = email.trim().toLowerCase();
  const trimmedUserName = userName.trim();
  let firebaseUID = null;

  try {
    const existingUser = await User.findOne({
      $or: [{ email: trimmedEmail }, { userName: trimmedUserName }],
    });
    if (existingUser)
      return res
        .status(409)
        .json({ message: "Email hoặc Username đã tồn tại" });

    console.log("✅ Dữ liệu đã qua bước kiểm tra tồn tại");

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      { email: trimmedEmail, password, returnSecureToken: true }
    );

    const { idToken, localId } = response.data;
    firebaseUID = localId;

    const allowedRoles = ["student", "teacher", "admin"];
    const safeRole = allowedRoles.includes(role) ? role : "student";

    const newUser = await User.create({
      firebaseUid: firebaseUID,
      userName: trimmedUserName,
      email: trimmedEmail,
      fullName,
      phoneNumber,
      role: safeRole,
    });

    // Log dữ liệu trước khi trả về client
    console.log("✅ Dữ liệu user mới tạo thành công:", {
      userName: newUser.userName,
      fullName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
      firebaseUid: newUser.firebaseUid,
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      idToken,
      uid: firebaseUID,
      user: {
        userName: newUser.userName,
        fullName: newUser.fullName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    res.status(500).json({ message: "Đăng ký thất bại" });
  }
};

// -------------------- FORGOT PASSWORD --------------------
const forgotPasswordWithFirebase = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Vui lòng nhập email" });
    }

    const firebaseUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;
    const response = await axios.post(firebaseUrl, {
      requestType: "PASSWORD_RESET",
      email,
    });

    console.log("📩 Firebase gửi mail reset password:", response.data);

    res.status(200).json({
      message: "Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.",
    });
  } catch (err) {
    console.error("Forgot password error:", err.response?.data || err.message);
    res.status(500).json({ message: "Gửi email reset mật khẩu thất bại" });
  }
};

export { loginWithFirebase, signupWithFirebase, forgotPasswordWithFirebase };
