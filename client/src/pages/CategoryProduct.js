import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.error("Failed to fetch category products", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center text-uppercase text-primary fw-bold">
          Category: {category?.name}
        </h2>
        <p className="text-center text-muted mb-5">
          {products?.length} result{products?.length !== 1 && "s"} found
        </p>

        <div className="row justify-content-center">
          {products?.map((p) => (
            <div
              key={p._id}
              className="col-sm-6 col-md-4 col-lg-3 d-flex"
              style={{ marginBottom: "30px" }}
            >
              <div
                className="card w-100 shadow-sm"
                style={{
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "10px",
                    backgroundColor: "#f9fafb",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold">{p.name}</h5>
                    <p
                      className="card-text text-muted"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {p.description.substring(0, 60)}...
                    </p>
                    <p className="fw-bold text-success">₹ {p.price}</p>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-outline-secondary w-50"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Details
                    </button>
                    <button
                      className="btn btn-sm btn-primary w-50"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item added to cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {products?.length === 0 && (
            <div className="text-center text-muted">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
