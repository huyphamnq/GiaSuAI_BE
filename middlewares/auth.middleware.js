const admin = require("../configs/firebaseAdmin");
const User = require("../models/User");

// Middleware xác thực token từ client gửi lên
const verifyFirebaseToken = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization: Bearer <token>
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ message: "Missing token" });

    // Xác thực token với Firebase
    const decoded = await admin.auth().verifyIdToken(token);

    // Tìm user trong MongoDB theo UID từ Firebase
    const user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user)
      return res
        .status(404)
        .json({ message: "User không tồn tại trong hệ thống" });

    // Gắn thông tin user vào request để các route sau dùng
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = verifyFirebaseToken;
