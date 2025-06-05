const express = require("express");
const router = express.Router();
const {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} = require("../controllers/productController");
const { adminAuth } = require("../middlewares/adminAuth"); // Ensure you have this middleware for admin authentication

const upload = require("../middlewares/multer");  // Use your configured multer here

router.post(
  '/add', adminAuth ,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  addProduct
);


// Route to list all products
router.get("/list", listProducts);
// Route to get a single product by ID
router.get("/list/:id", singleProduct);
// Route to remove a product by ID
router.delete("/remove/:id",adminAuth, removeProduct);

module.exports = router;
