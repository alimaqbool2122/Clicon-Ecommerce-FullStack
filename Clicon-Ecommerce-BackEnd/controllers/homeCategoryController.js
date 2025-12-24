import { homeCategory } from "../models/homeCategoryModel.js";

// Create Home Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const homecategory = await homeCategory.create({
      name,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      homecategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Home Categories
export const getAllCategories = async (req, res) => {
  try {
    const homeCategories = await homeCategory.find();

    res.status(200).json({
      success: true,
      homeCategories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error); // More descriptive log
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update Home Category
export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    // Validate input
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Update the category
    const updatedCategory = await homeCategory.findOneAndUpdate(
      { categoryId: parseInt(categoryId) },
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Home Category
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // For ID checker
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    // Delete the category
    const deletedCategory = await homeCategory.findOneAndDelete({
      categoryId: parseInt(categoryId),
    });

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
