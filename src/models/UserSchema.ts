
import mongoose from "mongoose";
 const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    image:{
        type: String,
        required: false,
        default: "https://placehold.net/avatar-2.svg"
        
    },
    authProviderId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
 })

 export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
 