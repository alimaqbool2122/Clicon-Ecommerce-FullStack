import mongoose from "mongoose";
import Counter from "./Counter.js";

const servicesSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Auto-increment 'id'
servicesSchema.pre("save", async function () {
  if (this.id) return; // already assigned

  const counter = await Counter.findOneAndUpdate(
    { id: "servicesId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.id = counter.seq;
});

export const homeServices = mongoose.model("homeServices", servicesSchema);
