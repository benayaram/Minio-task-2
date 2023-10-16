const mongoose = require('mongoose');

// Define a schema for the media data
const mediaSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  mediaUrl: String, // You can store the media URL or key in Minio here
});

// Create a model using the schema
const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;