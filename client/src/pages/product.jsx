import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/shopContext";
import Return from "../assets/return.png";
import { IoLocationOutline } from "react-icons/io5";
import { initAccordions } from "flowbite";
import Categorized from "../components/categorized";
import Suggestions from "../components/suggetions";

function Product() {
  const { productId } = useParams();
  const { Products, addToCart } = useContext(shopContext);
  const [selectedSize, setSelectedSize] = useState("");

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

  const handleAddToCart = () => {
    if (product.category !== "Accessories" && !selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id, selectedSize);
  };

  return (
    <div className="p-4 md:flex md:gap-8 mt-10">
      {/* Left side images */}
      <div className="md:w-1/2 grid grid-cols-2 gap-4">
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Product ${i}`}
            className="w-full h-auto object-cover rounded-md"
          />
        ))}
      </div>

      {/* Right side info */}
      <div className="md:w-1/2 flex flex-col gap-6 mt-6 md:mt-0">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500 text-sm">{product.typeofproduct}</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex justify-between px-1 pt-6">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="line-through text-gray-500">
                  ₹{product.originalPrice}
                </span>
                <span className="text-red-600 text-sm font-medium">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>
          <div className="text-right text-sm">
            {product.rating && <div>⭐ {product.rating}</div>}
            {product.reviews && <div>{product.reviews} reviews</div>}
          </div>
        </div>

        <span className="text-xs text-gray-400 px-1">
          Inclusive of all taxes
        </span>

        {/* Size selection */}
        {product.category !== "Accessories" && (
          <div className="px-1">
            <p className="text-sm text-gray-600">Please select a size</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {!Array.isArray(product.size) ||
              product.size.length === 0 ||
              product.size.every((s) => !s?.trim()) ? (
                <span className="px-4 py-1 bg-gray-200 rounded">N/A</span>
              ) : (
                product.size.map((s, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-1 rounded cursor-pointer text-sm border ${
                      selectedSize === s
                        ? "bg-black text-white"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    {s?.trim() || "N/A"}
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          className="bg-black text-white px-6 py-3 rounded-md w-fit mt-4 mx-1 hover:opacity-90"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        {/* Delivery */}
        <div className="flex flex-col gap-2 mt-6 px-1">
          <div className="flex items-center gap-2 text-gray-800">
            <IoLocationOutline size={18} />
            <span>Check for Delivery Details</span>
          </div>
          <div className="flex items-center mt-1">
            <input
              type="text"
              placeholder="Enter your pincode"
              className="border border-gray-400 px-3 py-2 rounded-md w-1/2"
            />
            <button className="ml-3 text-sm text-blue-600 hover:underline">
              Check
            </button>
          </div>
        </div>

        {/* Return info */}
        <div className="bg-gray-100 p-4 rounded-xl flex gap-4 items-center mt-4 mx-1">
          <img src={Return} alt="Return" className="w-10 h-10" />
          <p className="text-sm text-gray-700">
            This product is eligible for return or exchange under our 30-day
            return or exchange policy. No questions asked.
          </p>
        </div>

        {/* Accordion */}
        <div id="accordion-color" data-accordion="collapse" className="mt-6">
          {/* Product Details Accordion */}
          <h2 id="accordion-color-heading-1">
            <button
              type="button"
              className="flex justify-between items-center w-full px-5 py-3 text-white bg-black rounded-t-md"
              data-accordion-target="#accordion-color-body-1"
              aria-expanded="false"
              aria-controls="accordion-color-body-1"
            >
              <span>
                {product.typeofproduct === "Backpacks"
                  ? "Backpack Details"
                  : "Product Details"}
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M9 5 5 1 1 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-1"
            className="hidden"
            aria-labelledby="accordion-color-heading-1"
          >
            <div className="bg-gray-100 px-5 py-4 text-sm text-gray-800">
              <ul className="mb-2 space-y-1">
                {product.typeofproduct === "Backpacks" ? (
                  <>
                    <li><strong>Capacity:</strong> {product.productDetails.capacity}</li>
                    <li><strong>Weight:</strong> {product.productDetails.weight}</li>
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
                  </>
                ) : (
                  <>
                    <li><strong>Material:</strong> {product.productDetails.material}</li>
                    <li><strong>Care:</strong> {product.productDetails.care}</li>
                  </>
                )}
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

              {product.productDetails.features && (
                <>
                  <strong>Key Features:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {product.productDetails.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Description Accordion */}
          <h2 id="accordion-color-heading-2">
            <button
              type="button"
              className="flex justify-between items-center w-full px-5 py-3 bg-black text-white"
              data-accordion-target="#accordion-color-body-2"
              aria-expanded="false"
              aria-controls="accordion-color-body-2"
            >
              <span>Product Description</span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M9 5 5 1 1 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-2"
            className="hidden"
            aria-labelledby="accordion-color-heading-2"
          >
            <div className="bg-gray-100 px-5 py-4 text-sm text-gray-800">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
