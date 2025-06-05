import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
    if (isConnected) {
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        isConnected = false;
        throw error; // Let the calling function handle the error
    }
};

export default connectDb;