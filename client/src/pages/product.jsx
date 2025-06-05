import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/shopContext";
import "../css/product.css";
import Return from "../assets/return.png";
import { FaRegHeart } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { initAccordions } from "flowbite";
import { useEffect } from "react";
import { useState } from "react";
import Categorized from "../components/Categorized";
import Suggestions from "../components/suggetions";

function Product() {
  const { productId } = useParams();
  const { Products } = useContext(shopContext);
  const { addToCart } = useContext(shopContext);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = () => {
    if (product.category !== "Accessories" && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart(product.id, selectedSize);
  };
  useEffect(() => {
    initAccordions();
  }, [productId]);

  if (!Products || Products.length === 0) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  const product = Products.find((item) => item.id == productId);

  if (!product) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <>
      <div className="product">
        {/* Left Section - Image Grid */}
        <div className="product-left">
          <div className="image-grid">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product view ${index + 1}`}
                className="grid-image"
              />
            ))}
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="product-right">
          <div className="flex justify-between items-center">
            <div>
              <div
                className="product-name"
                style={{ fontSize: "2rem", fontWeight: "700" }}
              >
                {product.name}
              </div>
              <div className="product-type" style={{ fontSize: "1rem" }}>
                {product.typeofproduct}
              </div>
            </div>
            <div className="add-to-wishlist">
              {/* <FaRegHeart size={"20px"} style={{ marginRight: "10px" }} /> */}
            </div>
          </div>

          {/* Pricing and Reviews */}
          <div
            className="price-reviews flex items-center justify-between"
            style={{ padding: "0 10px", paddingTop: "3rem" }}
          >
            <div className="flex items-center gap-2">
              <div className="current-price">₹{product.price}</div>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <>
                    <div className="original-price">
                      ₹{product.originalPrice}
                    </div>
                    <div className="discount-rate">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </div>
                  </>
                )}
            </div>

            <div>
              <div className="rating">
                {product.rating && `⭐ ${product.rating}`}
              </div>
              <div className="reviews">
                {product.reviews && `${product.reviews} reviews`}
              </div>
            </div>
          </div>

          <span style={{ marginLeft: "10px", color: "#888" }}>
            Inclusive of all taxes
          </span>

          {/* Size Selection */}
          {product.category !== "Accessories" && (
            <div
              className="product-size"
              style={{ marginTop: "2rem", marginLeft: "10px" }}
            >
              <span>Please select a size.</span>
              <div className="size-buttons">
                {!Array.isArray(product.size) ||
                product.size.length === 0 ||
                product.size.every((s) => !s?.trim()) ? (
                  <span className="size-button selected">N/A</span>
                ) : (
                  product.size.map((s, index) => (
                    <span
                      key={index}
                      className={`size-button ${
                        selectedSize === s ? "selected" : ""
                      }`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s?.trim() || "N/A"}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <div
            style={{ margin: "3rem 10px " }}
            className="flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <IoLocationOutline /> Check for Delivery Details
            </div>
            <div className="delivery-location ">
              <input
                type="text"
                placeholder="Enter your pincode"
                className="pincode-input"
              />
              <button
                style={{ marginLeft: "30px" }}
                className="check-delivery cursor-pointer"
              >
                Check
              </button>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(139, 139, 139, 0.106",
              padding: "20px 10px",
              marginBottom: "30px",
            }}
            className="return-policy flex items-center gap-2 rounded-2xl"
          >
            <img src={Return} alt="" />
            <span style={{ marginLeft: "10px" }}>
              This product is eligible for return or exchange under our 30-day
              return or exchange policy. No questions asked.
            </span>
          </div>
          <div className="product-accordion">
            <div id="accordion-color" data-accordion="collapse">
              {product.typeofproduct === "Backpacks" ? (
                <>
                  {/* Backpack Details Accordion */}
                  <h2 id="accordion-color-heading-1">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full font-medium border border-b-0 rounded-t-xl gap-3"
                      style={{
                        padding: "20px",
                        backgroundColor: "rgb(14, 13, 13)",
                        color: "#ffffff",
                        borderColor: "#444444",
                      }}
                      data-accordion-target="#accordion-color-body-1"
                      aria-expanded="false"
                      aria-controls="accordion-color-body-1"
                    >
                      <span>Backpack Details</span>
                      <svg
                        data-accordion-icon
                        className="w-3 h-3 rotate-180 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="#ffffff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id="accordion-color-body-1"
                    className="hidden"
                    aria-labelledby="accordion-color-heading-1"
                  >
                    <div
                      style={{
                        padding: "20px",
                        backgroundColor: "rgba(139, 139, 139, 0.106)",
                        color: "#ffffff",
                        borderColor: "#444444",
                        borderStyle: "solid",
                        borderWidth: "1px 0 0 0",
                      }}
                    >
                      <ul style={{ marginBottom: "8px" }}>
                        <li>
                          <strong>Capacity:</strong>{" "}
                          {product.productDetails.capacity}
                        </li>
                        <li>
                          <strong>Weight:</strong>{" "}
                          {product.productDetails.weight}
                        </li>
                        <li>
                          <strong>Dimensions:</strong>{" "}
                          {product.productDetails.dimensions.height} x{" "}
                          {product.productDetails.dimensions.width} x{" "}
                          {product.productDetails.dimensions.length}
                        </li>
                        <li>
                          <strong>Material:</strong> Body -{" "}
                          {product.productDetails.material.body}, Lining -{" "}
                          {product.productDetails.material.lining}
                        </li>
                        <li>
                          <strong>Country of Origin:</strong>{" "}
                          {product.productDetails.countryOfOrigin}
                        </li>
                        <li>
                          <strong>Manufacturer:</strong>{" "}
                          {product.productDetails.manufacturer.name}
                        </li>
                        <li>
                          <strong>Address:</strong>{" "}
                          {product.productDetails.manufacturer.address}
                        </li>
                        <li>
                          <strong>Email:</strong>{" "}
                          {product.productDetails.manufacturer.email}
                        </li>
                      </ul>
                      <strong>Key Features:</strong>
                      <ul style={{ marginTop: "8px" }}>
                        {product.productDetails.features.map(
                          (feature, index) => (
                            <li key={index}>• {feature}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Product Details */}
                  <h2 id="accordion-color-heading-1">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full font-medium border border-b-0 rounded-t-xl gap-3"
                      style={{
                        padding: "20px",
                        backgroundColor: "rgb(14, 13, 13)",
                        color: "#ffffff",
                        borderColor: "#444444",
                      }}
                      data-accordion-target="#accordion-color-body-1"
                      aria-expanded="false"
                      aria-controls="accordion-color-body-1"
                    >
                      <span>Product Details</span>
                      <svg
                        data-accordion-icon
                        className="w-3 h-3 rotate-180 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="#ffffff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id="accordion-color-body-1"
                    className="hidden"
                    aria-labelledby="accordion-color-heading-1"
                  >
                    <div
                      style={{
                        padding: "20px",
                        backgroundColor: "rgba(139, 139, 139, 0.106)",
                        color: "#ffffff",
                        borderColor: "#444444",
                        borderStyle: "solid",
                        borderWidth: "1px 0 0 0",
                      }}
                    >
                      <ul style={{ marginBottom: "8px" }}>
                        <li>
                          <strong>Material:</strong>{" "}
                          {product.productDetails.material}
                        </li>
                        <li>
                          <strong>Care:</strong> {product.productDetails.care}
                        </li>
                        <li>
                          <strong>Country of Origin:</strong>{" "}
                          {product.productDetails.countryOfOrigin}
                        </li>
                        <li>
                          <strong>Manufacturer:</strong>{" "}
                          {product.productDetails.manufacturer.name}
                        </li>
                        <li>
                          <strong>Address:</strong>{" "}
                          {product.productDetails.manufacturer.address}
                        </li>
                        <li>
                          <strong>Email:</strong>{" "}
                          {product.productDetails.manufacturer.email}
                        </li>
                        {product.productDetails.manufacturer.customerCare && (
                          <li>
                            <strong>Customer Care:</strong>{" "}
                            {product.productDetails.manufacturer.customerCare}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {/* Product Description */}
              <h2 id="accordion-color-heading-2">
                <button
                  type="button"
                  className="flex items-center justify-between w-full font-medium border border-b-0 gap-3"
                  style={{
                    padding: "20px",
                    backgroundColor: "rgb(14, 13, 13)",
                    color: "#ffffff",
                    borderColor: "#444444",
                  }}
                  data-accordion-target="#accordion-color-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-color-body-2"
                >
                  <span>Product Description</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-color-body-2"
                className="hidden"
                aria-labelledby="accordion-color-heading-2"
              >
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "rgba(139, 139, 139, 0.106)",
                    color: "#ffffff",
                    borderColor: "#444444",
                    borderStyle: "solid",
                    borderWidth: "1px 0 0 0",
                  }}
                >
                  <p style={{ marginBottom: "8px" }}>
                    {product.productDescription}
                  </p>
                </div>
              </div>

              {/* Artist Details */}
              <h2 id="accordion-color-heading-3">
                <button
                  type="button"
                  className="flex items-center justify-between w-full font-medium border gap-3"
                  style={{
                    padding: "20px",
                    backgroundColor: "rgb(14, 13, 13)",
                    color: "#ffffff",
                    borderColor: "#444444",
                  }}
                  data-accordion-target="#accordion-color-body-3"
                  aria-expanded="false"
                  aria-controls="accordion-color-body-3"
                >
                  <span>Artist's Details</span>
                  <svg
                    data-accordion-icon
                    className="w-3 h-3 rotate-180 shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5 5 1 1 5"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id="accordion-color-body-3"
                className="hidden"
                aria-labelledby="accordion-color-heading-3"
              >
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "rgba(139, 139, 139, 0.106)",
                    color: "#ffffff",
                    borderColor: "#444444",
                    borderStyle: "solid",
                    borderWidth: "1px 0 0 0",
                  }}
                >
                  <p style={{ marginBottom: "8px" }}>{product.artistDetails}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="related-products">
        <Suggestions
          title="You may also like"
          category={product.category}
          excludeId={product.id}
        /><Suggestions
          category={product.category}
          excludeId={product.id}
        />
      </div>
    </>
  );
}

export default Product;
