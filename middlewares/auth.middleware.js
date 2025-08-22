import admin from "../configs/firebaseAdmin.js";
import User from "../models/User.js";

// Middleware xác thực token từ client gửi lên
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User không tồn tại trong hệ thống" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Firebase token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyFirebaseToken;
