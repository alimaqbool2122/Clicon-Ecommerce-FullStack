import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createBannerSlide,
  deletebanner,
  getAllBanners,
  updateBanner,
} from "../controllers/homeBannerController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-banner",
  upload.single("image"),
  verifyToken,
  createBannerSlide
);
router.get("/get-allbanners", verifyToken, getAllBanners);
router.post(
  "/update-banner/:id",
  upload.single("image"),
  verifyToken,
  updateBanner
);
router.delete("/delete-banner/:id", verifyToken, deletebanner);

export default router;
