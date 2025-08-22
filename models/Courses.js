import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    created_By: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "active", "disabled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
