import { homeBanner } from "../models/bannerSlideModal.js";

// Create Home Banner.
export const createBannerSlide = async (req, res) => {
  try {
    const { subtitle, title, description, badge } = req.body || {};

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    if (!subtitle || !title || !description || !badge) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (subtitle, title, description, badge) are required",
      });
    }

    // Get the uploaded file path
    const imagePath = req.file.path;
    const data = await homeBanner.create({
      subtitle,
      title,
      description,
      badge,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: "Banner slide created successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Home Banners.
export const getAllBanners = async (req, res) => {
  try {
    const data = await homeBanner.find();

    res.status(200).json({
      success: true,
      message: "Banner slide fetches successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update Home Banner.
export const updateBanner = async (req, res) => {
  try {
    const id = req.params.id;
    const { subtitle, title, description, badge } = req.body || {};

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Banner ID is required",
      });
    }

    // Find the existing banner
    const existingBanner = await homeBanner.findOne({ id: parseInt(id) });

    if (!existingBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // Prepare update data
    const updateData = {
      subtitle: subtitle || existingBanner.subtitle,
      title: title || existingBanner.title,
      description: description || existingBanner.description,
      badge: badge || existingBanner.badge,
    };

    // If a new image is uploaded, update the image path
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Update the banner
    const updatedBanner = await homeBanner.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true, runValidators: true } // Return updated document and run validators
    );

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Home Banner.
export const deletebanner = async (req, res) => {
  try {
    const id = req.params.id;

    // For ID checker
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Banner ID is required",
      });
    }

    // Delete the category
    const deletedBanner = await homeBanner.findOneAndDelete({
      id: parseInt(id),
    });

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Banner:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
