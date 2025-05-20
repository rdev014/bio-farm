import mongoose, { Schema, Document } from "mongoose";

// Interface for Product document
export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  farm: {
    name: string;
    location: string;
    certifications: string[];
  };
  stock: number;
  unit: string;
  weight: number;
  organic: boolean;
  seasonal: boolean;
  seasonAvailability?: {
    startMonth: number;
    endMonth: number;
  };
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  certifications: string[];
  storageInstructions: string;
  tags: string[];
  featured: boolean;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    comparePrice: {
      type: Number,
      min: [0, "Compare price cannot be negative"],
    },
    images: {
      type: [String],
      required: [true, "At least one product image is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      index: true,
    },
    subcategory: {
      type: String,
      index: true,
    },
    farm: {
      name: {
        type: String,
        required: [true, "Farm name is required"],
      },
      location: {
        type: String,
        required: [true, "Farm location is required"],
      },
      certifications: [String],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    unit: {
      type: String,
      required: [true, "Unit of measurement is required"],
      enum: ["kg", "g", "lb", "oz", "bunch", "piece", "dozen"],
    },
    weight: {
      type: Number,
      required: [true, "Product weight is required"],
      min: [0, "Weight cannot be negative"],
    },
    organic: {
      type: Boolean,
      default: false,
      index: true,
    },
    seasonal: {
      type: Boolean,
      default: false,
      index: true,
    },
    seasonAvailability: {
      startMonth: Number,
      endMonth: Number,
    },
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number,
    },
    certifications: [String],
    storageInstructions: String,
    tags: {
      type: [String],
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ name: 'text', description: 'text' });

// Pre-save hook to generate slug from name
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  next();
});

// Virtual for calculating discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  }
  return 0;
});

// Check if product is currently in season
productSchema.virtual('inSeason').get(function() {
  if (!this.seasonal || !this.seasonAvailability) return true;
  
  const currentMonth = new Date().getMonth() + 1;
  const { startMonth, endMonth } = this.seasonAvailability;
  
  if (startMonth <= endMonth) {
    return currentMonth >= startMonth && currentMonth <= endMonth;
  } else {
    // Handle cases where season spans across year end (e.g., Nov-Feb)
    return currentMonth >= startMonth || currentMonth <= endMonth;
  }
});

// Export the model
const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
export default Product;

