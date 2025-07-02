import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { shopContext } from "../context/shopContext";
import Return from "../assets/return.png";
import { IoLocationOutline } from "react-icons/io5";
import { initAccordions } from "flowbite";
import Suggestions from "../components/suggetions";

function Product() {
  const { productId } = useParams();
  const { Products, addToCart } = useContext(shopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    initAccordions();
  }, [productId]);

  const pincodeLocations = {
    400058: "Andheri East",
    400093: "Andheri East",
    400102: "Jogeshwari West",
    400060: "Jogeshwari East",
    400056: "Vile Parle West",
    400057: "Vile Parle East",
    400064: "Malad West",
    400097: "Malad East",
    400062: "Goregaon West",
    400063: "Goregaon East",
  };

  const checkAvailability = () => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      if (pincodeLocations[pincode]) {
        setDeliveryStatus({
          available: true,
          location: pincodeLocations[pincode],
        });
      } else {
        setDeliveryStatus({ available: false });
      }
    } else {
      setDeliveryStatus(null);
    }
  };

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

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <>
      <div className="px-4 py-8 mx-auto w-full max-w-7xl mt-5 md:mt-7 lg:mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left images */}
          <div className="w-full lg:w-2/3 grid grid-cols-2 gap-4">
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
          <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl md:text-4xl font-bold">
                  {product.name}
                </h1>
                <p className="text-gray-500 text-sm md:text-lg">
                  {product.typeofproduct}
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex justify-between items-start pt-2 md:pt-4">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl font-semibold">
                  ₹{product.price}
                </span>
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <>
                      <span className="line-through text-gray-500 text-sm">
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
              <div className="text-sm text-right">
                {product.rating && <div>⭐ {product.rating}</div>}
                {product.reviews && <div>{product.reviews} reviews</div>}
              </div>
            </div>
            <span className="text-xs text-gray-400">
              Inclusive of all taxes
            </span>

            {/* Size Selection */}
            {product.category !== "Accessories" && (
              <div>
                <p className="text-sm text-gray-600">Please select a size</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.size?.length > 0 &&
                  product.size.some((s) => s?.trim()) ? (
                    product.size.map((s, i) => (
                      <span
                        key={i}
                        onClick={() => setSelectedSize(s)}
                        className={`px-2 py-0.5 md:px-4 md:py-1 rounded cursor-pointer text-xs md:text-lg border ${
                          selectedSize === s
                            ? "text-white border-white font-semibold"
                            : "text-white border-gray-500"
                        }`}
                      >
                        {s?.trim() || "N/A"}
                      </span>
                    ))
                  ) : (
                    <span className="px-4 py-1 bg-gray-200 rounded">N/A</span>
                  )}
                </div>
              </div>
            )}

            {/* Add to Cart/Login */}
            {isLoggedIn ? (
              <button
                className="bg-white text-black font-bold text-sm md:text-lg px-6 py-3 rounded-xl w-full mt-2 hover:opacity-90"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            ) : (
              <button
                className="bg-white text-black font-bold text-sm md:text-lg px-6 py-3 rounded-xl w-full mt-2 hover:opacity-90"
                onClick={handleLoginRedirect}
              >
                Login to Purchase
              </button>
            )}

            {/* Delivery Check */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2">
                <IoLocationOutline size={18} />
                <span>Check for Delivery Details</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPincode(value);
                    if (value.length !== 6 || !/^\d+$/.test(value)) {
                      setDeliveryStatus(null);
                    }
                  }}
                  placeholder="Enter your pincode"
                  maxLength={6}
                  className="border border-gray-400 md:px-3 md:py-2 rounded-md w-full text-black"
                />
                <button
                  onClick={checkAvailability}
                  className="text-white px-4 py-2 rounded-md hover:bg-white/10"
                >
                  Check
                </button>
              </div>
              {deliveryStatus && (
                <div
                  className={`text-sm ${
                    deliveryStatus.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {deliveryStatus.available
                    ? `Yes, delivery is available to ${deliveryStatus.location}`
                    : "Sorry, delivery is not available to this pincode"}
                </div>
              )}
            </div>

            {/* Return Info */}
            <div className="p-1 md:p-4 rounded-xl flex gap-4 items-center mt-4">
              <img
                src={Return}
                alt="Return"
                className="w-5 h-5 md:w-10 md:h-10"
              />
              <p className="text-xs md:text-lg">
                This product is eligible for return or exchange under our 30-day
                return or exchange policy. No questions asked.
              </p>
            </div>

            {/* Accordion Section */}
            <div
              id="accordion-color"
              data-accordion="collapse"
              className="mt-4"
            >
              <h2 id="accordion-color-heading-1">
                <button
                  type="button"
                  className="flex justify-between items-center w-full px-5 py-3 border border-white rounded-t-md"
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
                <div className="px-5 py-4 text-sm text-gray-200">
                  <ul className="mb-2 space-y-1">
                    {product.typeofproduct === "Backpacks" ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <li>
                          <strong>Material:</strong>{" "}
                          {product.productDetails.material}
                        </li>
                        <li>
                          <strong>Care:</strong> {product.productDetails.care}
                        </li>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <Suggestions
          title="Similar Products"
          category={product.category}
          excludeId={product.id}
        />
      </div>
    </>
  );
}

export default Product;
