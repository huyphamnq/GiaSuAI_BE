import mongoose from "mongoose";

const { Schema } = mongoose;

const submissionSchema = new Schema(
  {
    exercise_id: { type: Schema.Types.ObjectId, ref: "Exercise" },
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    answer: String,
    score: Number,
    feedback: String,
    attempt_number: Number,
    status: { type: String, enum: ["pending", "graded"], default: "pending" },
    submitted_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", submissionSchema);
