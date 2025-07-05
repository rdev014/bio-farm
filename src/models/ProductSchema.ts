
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: { type: String, default: "Arkin Organics" },
    images: [{ type: String }], // URLs to images
    price: { type: Number, required: true },
    discount: {
      type: Number,
      default: 0, // percentage-based
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String }],
    weight: { type: Number, required: true }, // in kg or g
    unit: { type: String, enum: ["g", "kg", "ml", "ltr", "unit"], required: true },
    specifications: {
      type: Map,
      of: String, // For key-value specs like "NPK ratio": "10:20:10"
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
