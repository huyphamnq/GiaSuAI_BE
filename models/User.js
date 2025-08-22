import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/^[a-zA-Z0-9_]+$/, "Username chỉ chứa chữ, số, dấu _"],
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Email không hợp lệ"],
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^[0-9]{9,12}$/, "Số điện thoại không hợp lệ"],
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
  },
  { timestamps: true }
);

// Optional: compound index để search nhanh
userSchema.index({ userName: 1, email: 1 });

export default mongoose.model("User", userSchema);
