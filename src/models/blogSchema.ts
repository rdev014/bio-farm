import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: mongoose.Types.ObjectId; // Ref to User
  featuredImage: string;
  categories: mongoose.Types.ObjectId[];
  tags: string[];
  readTime: number;
  publishedAt: Date;
  updatedAt: Date;
  status: "draft" | "publish";
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [150, "Blog title cannot exceed 150 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    excerpt: {
      type: String,
      required: [true, "Blog excerpt is required"],
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: {
      type: String,
      required: [true, "Featured image is required"],
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    readTime: {
      type: Number,
      required: true,
      min: [1, "Read time must be at least 1 minute"],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["draft", "publish"],
      default: "draft",
    },
    seo: {
      metaTitle: {
        type: String,
        maxlength: [60, "Meta title cannot exceed 60 characters"],
      },
      metaDescription: {
        type: String,
        maxlength: [160, "Meta description cannot exceed 160 characters"],
      },
      keywords: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true, // This will automatically manage createdAt and updatedAt
  }
);

// Middleware to update updatedAt timestamp
BlogSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create slug from title if not provided
BlogSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

export const Blog =
  mongoose.models?.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
