import { homeServices } from "../models/servicesModal.js";

// create services.
export const createServices = async (req, res) => {
  try {
    const { title, text } = req.body || {};

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    if (!title || !text) {
      return res.status(400).json({
        success: false,
        message: "All fields (text, title) are required",
      });
    }

    // Get the uploaded file path
    const imagePath = req.file.path;
    const data = await homeServices.create({
      title,
      text,
      image: imagePath,
    });

    res.status(201).json({
      success: true,
      message: "Services created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating services:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Home Services.
export const getAllServices = async (req, res) => {
  try {
    const data = await homeServices.find();

    res.status(200).json({
      success: true,
      message: "Services fetches successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching Services:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update Home Services
export const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, text } = req.body || {};

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    // Find the existing banner
    const existingService = await homeServices.findOne({ id: parseInt(id) });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Prepare update data
    const updateData = {
      title: title || existingService.title,
      text: text || existingService.text,
    };

    // If a new image is uploaded, update the image path
    if (req.file) {
      updateData.image = req.file.path;
    }

    // Update the banner
    const updatedService = await homeServices.findOneAndUpdate(
      { id: parseInt(id) },
      updateData,
      { new: true, runValidators: true } // Return updated document and run validators
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Delete Home Services.
export const deleteservice = async (req, res) => {
  try {
    const id = req.params.id;

    // For ID checker
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    // Delete the Service
    const deletedService = await homeServices.findOneAndDelete({
      id: parseInt(id),
    });

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Service:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
