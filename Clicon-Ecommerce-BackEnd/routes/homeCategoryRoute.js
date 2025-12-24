import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/homeCategoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-category", verifyToken, createCategory);
router.get("/get-allcategories", verifyToken, getAllCategories);
router.post("/update-category/:id", verifyToken, updateCategory);
router.delete("/delete-category/:id", verifyToken, deleteCategory);

export default router;
