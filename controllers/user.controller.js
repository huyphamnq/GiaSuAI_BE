import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    // Chỉ cho phép admin truy cập
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }

    const { userName, email, phoneNumber, fullName } = req.query;

    const filter = {};
    if (userName) filter.userName = { $regex: userName.trim(), $options: "i" };
    if (email) filter.email = { $regex: email.trim(), $options: "i" };
    if (phoneNumber)
      filter.phoneNumber = { $regex: phoneNumber.trim(), $options: "i" };
    if (fullName) filter.fullName = { $regex: fullName.trim(), $options: "i" };

    const users = await User.find(filter).select("-__v -password -refreshToken");

    res.status(200).json({
      message: "Lấy danh sách user thành công",
      total: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
