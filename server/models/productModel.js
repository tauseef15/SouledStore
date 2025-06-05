const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  bestseller: { type: Boolean, default: false },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  originalPrice: { type: Number },
  typeofproduct: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  size: [String],
  status: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  images: [String],
  productDetails: {
    material: { type: String },
    care: { 
      type: mongoose.Schema.Types.Mixed // Can be string or array depending on the product
    },
    sole: { type: String },
    lining: { type: String },
    capacity: { type: String },
    dimensions: {
      height: { type: String },
      width: { type: String },
      length: { type: String }
    },
    weight: { type: String },
    features: [String],
    countryOfOrigin: { type: String },
    manufacturer: {
      name: { type: String },
      address: { type: String },
      email: { type: String },
      customerCare: { type: String }
    }
  },
  productDescription: { type: String },
  artistDetails: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
