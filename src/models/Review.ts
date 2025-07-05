// models/Review.ts
import mongoose, { Schema, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: "Product", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
