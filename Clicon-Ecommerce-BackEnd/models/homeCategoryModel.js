import mongoose from 'mongoose';
import Counter from "./Counter.js";

const homeCategorySchema = new mongoose.Schema(
    {
        categoryId: { type: Number, unique: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

// Auto-increment 'id'
homeCategorySchema.pre("save", async function () {
    if (this.categoryId) return; // already assigned

    const counter = await Counter.findOneAndUpdate(
        { id: "categoryId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.categoryId = counter.seq;
});

export const homeCategory = mongoose.model("homeCategory", homeCategorySchema);