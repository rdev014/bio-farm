import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
  },
  image: {
    type: String,
    required: false,
    default: "https://placehold.net/avatar-2.svg",
  },
  role: {
    type: String,
    default: "user",
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  location: {
    type: String,
    trim: true,
  },
  contact_no: {
    type: String,
  },
  authProviderId: {
    type: String,
  },
  isSubscribedToNewsletter: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    select: false,
  },
  verificationTokenExpiry: {
    type: Date,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordTokenExpiry: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
