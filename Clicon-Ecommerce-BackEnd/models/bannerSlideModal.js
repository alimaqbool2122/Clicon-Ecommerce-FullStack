import mongoose from "mongoose";
import Counter from "./counter.js";

const bannerSlideSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    subtitle: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    badge: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Auto-increment 'id'
bannerSlideSchema.pre("save", async function () {
  if (this.id) return; // already assigned

  const counter = await Counter.findOneAndUpdate(
    { id: "bannerId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.id = counter.seq;
});

export const homeBanner = mongoose.model("homeBanner", bannerSlideSchema);
