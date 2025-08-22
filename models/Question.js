import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    exercise_id: { type: Schema.Types.ObjectId, ref: "Exercise" },
    question_text: String,
    options: [String],
    correct_answer: String,
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
