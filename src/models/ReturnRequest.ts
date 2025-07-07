// models/ReturnRequest.ts
import mongoose, { Schema, Types } from "mongoose";

const returnRequestSchema = new Schema(
  {
    order: { type: Types.ObjectId, ref: "Order", required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        reason: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["requested", "approved", "rejected", "received", "refunded"],
      default: "requested",
    },
    resolution: {
      type: String,
      enum: ["refund", "replacement", "store-credit"],
      default: "refund",
    },
    approvedBy: { type: Types.ObjectId, ref: "User" }, // Admin
    rejectionReason: { type: String },
    returnAddress: {
      type: String,
    },
    pickupScheduledAt: { type: Date },
    receivedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ReturnRequest || mongoose.model("ReturnRequest", returnRequestSchema);
