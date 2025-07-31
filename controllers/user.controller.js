const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    // Chỉ cho phép admin truy cập
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập" });
    }

    const { email, phoneNumber, fullName } = req.query;

    const filter = {};
    if (email) filter.email = { $regex: email, $options: "i" };
    if (phoneNumber)
      filter.phoneNumber = { $regex: phoneNumber, $options: "i" };
    if (fullName) filter.fullName = { $regex: fullName, $options: "i" };

    const users = await User.find(filter).select("-__v -password");

    res.status(200).json({ message: "Lấy danh sách user thành công", users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
  }
};

module.exports = {
  getUsers,
};
