import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  authProviderId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
