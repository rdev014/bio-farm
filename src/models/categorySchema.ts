import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
},
{
  timestamps: true,
}
);

// Create slug from name if not provided
CategorySchema.pre('validate', function(next) {
  // if (!this.slug && this.name) {
  //   this.slug = this.name
  //     .toLowerCase()
  //     .replace(/[^a-zA-Z0-9\s]/g, '')
  //     .replace(/\s+/g, '-');
  // }
  if (this.isModified('name') ) {
     this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});
CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});



// Index for efficient querying



export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;