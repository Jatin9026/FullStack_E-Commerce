import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { Select } from "antd";

const { Option } = Select;

// Badge color map
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Not Processed":
      return "bg-secondary text-white";
    case "Processing":
      return "bg-info text-dark";
    case "Shipped":
      return "bg-warning text-dark";
    case "Delivered":
      return "bg-success text-white";
    case "Cancelled":
      return "bg-danger text-white";
    default:
      return "bg-light text-dark";
  }
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const statuses = ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"];

  useEffect(() => {
    if (auth?.token) fetchAllOrders();
  }, [auth?.token]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-mfvo.onrender.com/api/v1/auth/all-orders", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching admin orders", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://e-commerce-backend-mfvo.onrender.com/api/v1/auth/order-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      fetchAllOrders(); // Refresh
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  return (
    <Layout title="Admin Dashboard - Orders">
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="mb-4 fw-bold text-primary">Manage All Orders</h2>
            {orders?.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="card shadow-sm border-0 rounded-4 mb-4 p-3"
                  style={{ backgroundColor: "#fdfdfd" }}
                >
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 text-dark">Order #{index + 1}</h5>
                    <span className={`badge px-3 py-2 ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  {/* Select */}
                  <div className="mb-2">
                    <label className="form-label fw-semibold">Change Status:</label>
                    <Select
                      bordered={true}
                      value={order.status}
                      onChange={(value) => handleStatusChange(order._id, value)}
                      style={{ width: 250 }}
                    >
                      {statuses.map((status, idx) => (
                        <Option key={idx} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  {/* Metadata */}
                  <hr />
                  <p><strong>Buyer:</strong> {order?.buyer?.name}</p>
                  <p><strong>Ordered:</strong> {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                  <p><strong>Payment:</strong> {order?.payment?.success ? "Success" : "Failed"}</p>

                  {/* Products */}
                  <div className="row mt-3">
                    {order?.products?.map((product, idx) => (
                      <div key={idx} className="col-md-4 mb-3">
                        <div className="card border-0 h-100 shadow-sm rounded-3">
                          <img
                            src={`https://e-commerce-backend-mfvo.onrender.com/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            className="card-img-top"
                            style={{
                              height: "220px",
                              objectFit: "contain",
                              backgroundColor: "#f9f9f9",
                              borderTopLeftRadius: "0.75rem",
                              borderTopRightRadius: "0.75rem",
                            }}
                          />
                          <div className="card-body">
                            <h6 className="fw-semibold">{product.name}</h6>
                            <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
                              ₹{product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted mt-4">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
