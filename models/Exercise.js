import mongoose from "mongoose";

const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    content_id: { type: Schema.Types.ObjectId, ref: "CourseContent" },
    type: { type: String, enum: ["mcq", "essay", "file-upload"] },
    title: String,
    description: String,
    max_score: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Exercise", exerciseSchema);
