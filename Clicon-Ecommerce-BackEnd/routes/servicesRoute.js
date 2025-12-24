import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createServices,
  deleteservice,
  getAllServices,
  updateService,
} from "../controllers/servicesController.js";

const router = express.Router();

router.post("/create-service", upload.single("image"), createServices);
router.get("/get-allservices", getAllServices);
router.post("/update-service/:id", upload.single("image"), updateService);
router.delete("/delete-service/:id", deleteservice);

export default router;
