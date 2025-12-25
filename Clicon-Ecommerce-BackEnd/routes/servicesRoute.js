import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createServices,
  deleteservice,
  getAllServices,
  updateService,
} from "../controllers/servicesController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-service",
  upload.single("image"),
  verifyToken,
  createServices
);
router.get("/get-allservices", verifyToken, getAllServices);
router.post(
  "/update-service/:id",
  upload.single("image"),
  verifyToken,
  updateService
);
router.delete("/delete-service/:id", verifyToken, deleteservice);

export default router;
