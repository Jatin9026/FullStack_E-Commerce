import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      toast.error("Error fetching products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Admin Dashboard - Products">
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-primary">All Products</h2>
              <span className="badge text-bg-light px-3 py-2 shadow-sm">
                Total: {products.length}
              </span>
            </div>

            <div className="row g-4">
              {products?.map((p) => (
                <div key={p._id} className="col-md-4">
                  <Link
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="text-decoration-none"
                  >
                    <div className="card shadow-sm border-0 rounded-4 h-100">
                    <img
  src={`/api/v1/product/product-photo/${p._id}`}
  alt={p.name}
  className="w-100 rounded-top"
  style={{
    height: "220px",
    objectFit: "contain",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    backgroundColor: "#f9f9f9", 
  }}
/>

                      <div className="card-body">
                        <h5 className="card-title fw-semibold text-dark">
                          {p.name}
                        </h5>
                        <p className="card-text text-muted mb-1" style={{ fontSize: "0.9rem" }}>
                          {p.description?.substring(0, 70)}...
                        </p>
                        <p className="text-primary fw-bold">₹ {p.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {products?.length === 0 && (
              <div className="text-center text-muted mt-5">
                <h5>No products found.</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
