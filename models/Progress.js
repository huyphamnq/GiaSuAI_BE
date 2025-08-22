import mongoose from "mongoose";

const { Schema } = mongoose;

const progressSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    content_id: { type: Schema.Types.ObjectId, ref: "CourseContent" },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    last_accessed_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
