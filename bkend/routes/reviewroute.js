const express = require("express");
const {
  uploadReview,
  upload,
  getAllReviews,
  getReviewsByUser,
  getReviewsByFood,
  getReviewsByArea,
  getReviewsByCity,
  updateReview,
  getImage // Import the new getImage function
} = require("../controllers/reviewcontroller");

const router = express.Router();

router.post("/upload", upload, uploadReview);
router.get("/all", getAllReviews);
router.get("/user/:userId", getReviewsByUser);
router.get("/food/:food", getReviewsByFood);
router.get("/area/:area", getReviewsByArea);
router.get("/city/:city",getReviewsByCity);
router.put("/update/:reviewId", updateReview);

router.get("/image/:imageId", getImage); // New route to get images

module.exports = router;