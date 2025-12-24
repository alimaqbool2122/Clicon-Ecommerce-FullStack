import mongoose from "mongoose";
import Counter from "./Counter";

const bannerOfferSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    subtitle: { type: String, required: true },
    title: { type: String, required: true },
    badge: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Auto-increment 'id'
bannerOfferSchema.pre("save", async function () {
  if (this.id) return; // already assigned

  const counter = await Counter.findOneAndUpdate(
    { id: "id" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.id = counter.seq;
});

export const bannerOffer = mongoose.model("bannerOffer", bannerOfferSchema);
