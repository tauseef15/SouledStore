const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

const addProduct = async (req, res) => {
  try {
    const { body, files } = req;
    console.log("Uploaded files:", files);

    const image1 = files.image1?.[0]?.path;
    const image2 = files.image2?.[0]?.path;
    const image3 = files.image3?.[0]?.path;
    const image4 = files.image4?.[0]?.path;

    if (!image1 || !image2 || !image3 || !image4) {
      return res.status(400).json({ message: "All 4 images are required" });
    }

    const images = [image1, image2, image3, image4];

    // Upload images to Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
        return uploadedImage.secure_url;
      })
    );

    // Save product with Cloudinary image URLs
    const newProduct = new Product({
      ...body,
      image: imagesUrl[0], // Main image
      images: imagesUrl.slice(1), // Remaining 3 images
    });

    await newProduct.save();

    console.log("Product added:", newProduct);
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error listing products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  }
  catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
};
