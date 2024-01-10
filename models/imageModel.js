const mongoose = require('mongoose');

const ImageDatabase = new mongoose.Schema({
  imageId: String,
  imageName: String,
  fileName: String,
  discription: String,
  tag: String,
  url: String,
  tham_url: String,
});

const ImageModel = mongoose.model('Image', ImageDatabase);

module.exports = ImageModel;