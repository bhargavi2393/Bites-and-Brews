const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { Readable } = require("stream");
const multer = require("multer");
const Review = require("../models/reviewmodel");
const { conn: getConn } = require("../config/db");

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload review with image
const uploadReview = async (req, res, next) => {
  try {
    const file = req.file;
    const {
      resname,
      location,
      area,
      city,
      food,
      userId,
      reviewContent,
      likes,
      comment,
    } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ success: false, message: "Invalid file type" });
    }

    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: "File size exceeds limit" });
    }

    const dbConn = getConn();

    if (!dbConn || !dbConn.db) {
      return res.status(500).json({ success: false, message: "MongoDB connection not available" });
    }

    const bucket = new GridFSBucket(dbConn.db, {
      bucketName: "reviewUploads",
    });

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
    });

    readableStream.pipe(uploadStream);

    uploadStream.on("finish", async () => {
      try {
        const newReview = await Review.create({
          image: uploadStream.id.toString(), // Store GridFS ObjectId instead of filename
          resname,
          location,
          area,
          city,
          food,
          userId,
          reviewContent,
        });

        res.status(201).json({
          success: true,
          message: "Review uploaded successfully",
          data: newReview,
        });
      } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ success: false, message: "Failed to create review" });
      }
    });

    uploadStream.on("error", (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get image URL for a review
const getImageUrl = (imageId) => {
  return `/api/reviews/image/${imageId}`;
};

// Get image by ID
const getImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    
    const dbConn = getConn();
    if (!dbConn || !dbConn.db) {
      return res.status(500).json({ success: false, message: "MongoDB connection not available" });
    }

    const bucket = new GridFSBucket(dbConn.db, {
      bucketName: "reviewUploads",
    });

    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(imageId);
    
    // Find the file in GridFS
    const files = await bucket.find({ _id: objectId }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const file = files[0];
    
    // Set appropriate headers
    res.set('Content-Type', file.contentType);
    res.set('Content-Length', file.length);
    
    // Create download stream and pipe to response
    const downloadStream = bucket.openDownloadStream(objectId);
    downloadStream.pipe(res);
    
    downloadStream.on('error', (error) => {
      console.error('Error streaming image:', error);
      res.status(500).json({ success: false, message: "Error retrieving image" });
    });

  } catch (error) {
    console.error('Error in getImage:', error);
    next(error);
  }
};

// Get all reviews with image URLs
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    
    // Add image URL to each review
    const reviewsWithImages = reviews.map(review => ({
      ...review.toObject(),
      imageUrl: getImageUrl(review.image)
    }));
    
    res.status(200).json({
      success: true,
      data: reviewsWithImages,
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews by userId with image URLs
const getReviewsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId });
    
    // Add image URL to each review
    const reviewsWithImages = reviews.map(review => ({
      ...review.toObject(),
      imageUrl: getImageUrl(review.image)
    }));
    
    res.status(200).json({ 
      success: true, 
      data: reviewsWithImages 
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews by city with image URLs
const getReviewsByCity = async (req, res, next) => {
  try {
    const { city } = req.params;
    const reviews = await Review.find({ city: { $regex: new RegExp(city, "i") } });

    // Add image URL to each review
    const reviewsWithImages = reviews.map(review => ({
      ...review.toObject(),
      imageUrl: getImageUrl(review.image)
    }));

    res.status(200).json({
      success: true,
      data: reviewsWithImages
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews by food with image URLs
const getReviewsByFood = async (req, res, next) => {
  try {
    const { food } = req.params;
    const reviews = await Review.find({ food: { $regex: new RegExp(food, "i") } });
    
    // Add image URL to each review
    const reviewsWithImages = reviews.map(review => ({
      ...review.toObject(),
      imageUrl: getImageUrl(review.image)
    }));
    
    res.status(200).json({ 
      success: true, 
      data: reviewsWithImages 
    });
  } catch (error) {
    next(error);
  }
};

// Get reviews by area with image URLs
const getReviewsByArea = async (req, res, next) => {
  try {
    const { area } = req.params;
    const reviews = await Review.find({ area: { $regex: new RegExp(area, "i") } });
    
    // Add image URL to each review
    const reviewsWithImages = reviews.map(review => ({
      ...review.toObject(),
      imageUrl: getImageUrl(review.image)
    }));
    
    res.status(200).json({ 
      success: true, 
      data: reviewsWithImages 
    });
  } catch (error) {
    next(error);
  }
};

// Update a review by reviewId
const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { resname, location, area, city, food, reviewContent, likes, comment } = req.body;

    // Check if review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    // Update review fields
    review.resname = resname || review.resname;
    review.location = location || review.location;
    review.area = area || review.area;
    review.city = city || review.city;
    review.food = food || review.food;
    review.reviewContent = reviewContent || review.reviewContent;

    // Save updated review
    const updatedReview = await review.save();

    // Add image URL to response
    const reviewWithImage = {
      ...updatedReview.toObject(),
      imageUrl: getImageUrl(updatedReview.image)
    };

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: reviewWithImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload: upload.single("image"),
  uploadReview,
  getAllReviews,
  getReviewsByUser,
  getReviewsByFood,
  getReviewsByArea,
  getReviewsByCity,
  updateReview,
  getImage // Export the new getImage function
};