import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth?.token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://e-commerce-backend-mfvo.onrender.com/api/v1/auth/orders", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data?.success !== false) {
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount) =>
    amount?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  return (
    <Layout title="Your Orders">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3 className="mb-4">Order History</h3>

            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-3">Loading your orders...</p>
              </div>
            ) : !auth?.token ? (
              <div className="alert alert-warning">
                Please login to view your orders.
              </div>
            ) : orders?.length > 0 ? (
              orders.map((order, index) => (
                <div key={order._id || index} className="card mb-4 shadow-sm border-0">
                  <div className="card-header bg-primary text-white d-flex justify-content-between">
                    <span>Order #{index + 1}</span>
                    <span className="text-end small">
                      {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-3">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "bg-success"
                              : order.status === "Shipped"
                              ? "bg-info"
                              : order.status === "Processing"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}
                        >
                          {order.status || "Not Processed"}
                        </span>
                      </div>

                      <div className="col-md-4">
                        <strong>Payment:</strong>{" "}
                        <span
                          className={`badge ${
                            order?.payment?.success ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {order?.payment?.success ? "Success" : "Failed"}
                        </span>
                      </div>

                      <div className="col-md-5 text-end">
                        {order?.payment?.razorpay_payment_id && (
                          <small className="text-muted">
                            Payment ID: {order.payment.razorpay_payment_id.slice(-8)}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      {order?.products?.map((product, pIndex) => (
                        <div
                          key={product._id || pIndex}
                          className="col-lg-4 col-md-6 mb-4"
                        >
                          <div className="card h-100 border rounded shadow-sm hover-shadow">
                            <img
                              src={`https://e-commerce-backend-mfvo.onrender.com/api/v1/product/product-photo/${product._id}`}
                              className="card-img-top"
                              alt={product.name}
                              style={{
                                height: "200px",
                                objectFit: "cover",
                                borderBottom: "1px solid #eee",
                              }}
                              onError={(e) => {
                                e.target.src = "/placeholder-image.jpg";
                              }}
                            />
                            <div className="card-body">
                              <h6 className="card-title text-primary">
                                {product.name}
                              </h6>
                              <p className="text-muted small">
                                {product.description?.substring(0, 60) + "..."}
                              </p>
                              <div className="fw-bold text-success">
                                {formatPrice(product.price)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card text-center">
                <div className="card-body">
                  <h5>No Orders Found</h5>
                  <p className="text-muted">
                    You haven’t placed any orders yet. Start shopping to see your
                    order history here.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Shop Now
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
