import React, { useEffect, useState } from "react";
import "../css/orders.css";
import { Helmet } from "react-helmet-async";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

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

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="orders">
            <Helmet>
              <title>Souled Store - Orders</title>
            </Helmet>
      <h2 className="font-bold">Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span><strong>Qauntity: </strong>{item.quantity}</span>
                  <span><strong>Price: </strong>₹{item.price}</span>
                <span><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleDateString()}</span>
                <span><strong>Delivery Address:</strong> {order.address.building}, {order.address.locality}, {order.address.city} - {order.address.pinCode}</span>
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
