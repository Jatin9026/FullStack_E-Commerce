import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const reference = query.get("reference");

  return (
    <Layout title="Payment Successful">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center bg-white p-5 rounded shadow-lg" style={{ maxWidth: "500px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success"
            width={100}
            className="mb-4"
          />
          <h2 className="text-success fw-bold mb-3">Payment Successful!</h2>
          <p className="text-muted mb-2">Reference ID: <strong>{reference}</strong></p>
          <p className="text-muted mb-4">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate("/dashboard/user/orders")}
          >
            View Orders
          </button>
          <button
            className="btn btn-outline-secondary mt-2"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
