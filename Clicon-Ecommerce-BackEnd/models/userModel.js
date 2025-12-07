import mongoose from "mongoose";
import Counter from "./Counter.js";

const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password_confirmation: { type: String, required: true },
    googleId: { type: String },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    token: { type: String, default: null },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    otpVerified: { type: Boolean, default: false },
    lastOtpSent: { type: String, default: null }
}, { timestamps: true });

// Auto-increment userId
userSchema.pre("save", async function () {
    if (this.userId) return; // if already assigned, skip

    const counter = await Counter.findOneAndUpdate(
        { id: "userId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.userId = counter.seq; // assign next number
});

export const User = mongoose.model("User", userSchema)