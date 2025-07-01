import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://souled-store.onrender.com/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10 text-sm sm:text-base">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="h-screen text-center mt-10 text-sm sm:text-base">No orders found.</p>;

  return (
    <div className="h-full w-[90%] mx-auto mt-10 mb-16 flex flex-col gap-6 ">
      <h2 className="text-xl sm:text-2xl font-bold px-4">Your Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-4"
        >
          <ul className="flex flex-col gap-6">
            {order.items.map((item, index) => (
              <li key={index} className="flex flex-col sm:flex-row gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-36 h-auto object-contain rounded-lg"
                />
                <div className="flex flex-col gap-2 text-sm sm:text-base">
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span>
                    <strong>Quantity:</strong> {item.quantity}
                  </span>
                  <span>
                    <strong>Price:</strong> ₹{item.price}
                  </span>
                  <span>
                    <strong>Placed On:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>Delivery Address:</strong>{" "}
                    {order.address.building}, {order.address.locality},{" "}
                    {order.address.city} - {order.address.pinCode}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Orders;
