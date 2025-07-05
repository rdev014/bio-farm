// models/Refund.ts
import mongoose, { Schema, Types } from "mongoose";

const refundSchema = new Schema(
  {
    returnRequest: { type: Types.ObjectId, ref: "ReturnRequest", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["original", "bank-transfer", "UPI", "wallet", "store-credit"],
      required: true,
    },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    processedAt: { type: Date },
    notes: { type: String },
    initiatedBy: { type: Types.ObjectId, ref: "User" }, // Admin or auto
  },
  { timestamps: true }
);

export default mongoose.models.Refund || mongoose.model("Refund", refundSchema);
