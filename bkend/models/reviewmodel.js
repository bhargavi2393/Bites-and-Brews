const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  image: {
    type: String, // GridFS filename
    required: true
  },
  resname:{
    type:String,
    required:true

  },
  location: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  food: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  reviewContent: {
    type: String,
    required: true
  },

}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
