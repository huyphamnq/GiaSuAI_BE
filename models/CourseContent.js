import mongoose from "mongoose";

const { Schema } = mongoose;

const courseContentSchema = new Schema(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "Course" },
    type: { type: String, enum: ["demo", "theory", "exercise"] },
    title: String,
    description: String,
    content_url: String,
    order_index: Number,
  },
  { timestamps: true }
);

export default mongoose.model("CourseContent", courseContentSchema);
