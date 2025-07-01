import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [page]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-mfvo.onrender.com/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-mfvo.onrender.com/api/v1/product/product-count");
      setTotal(data?.total || 0);
    } catch (error) {
      console.error("Error fetching total count:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://e-commerce-backend-mfvo.onrender.com/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (page === 1) setProducts(data.products);
      else setProducts((prev) => [...prev, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://e-commerce-backend-mfvo.onrender.com/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products || []);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  const handleFilter = (value, id) => {
    let updated = [...checked];
    if (value) updated.push(id);
    else updated = updated.filter((item) => item !== id);
    setChecked(updated);
  };

  const handleResetFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    getAllProducts();
  };

  return (
    <Layout title="All Products - Best Offers">
      <div className="container-fluid row mt-4">
        {/* Sidebar */}
        <div className="col-md-3 px-4 mb-4">
          <h5 className="text-center mb-3 text-primary fw-semibold">Filter By Category</h5>
          <div className="mb-4">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                checked={checked.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h5 className="text-center mb-3 text-primary fw-semibold">Filter By Price</h5>
          <Radio.Group
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            className="d-flex flex-column gap-2"
          >
            {Prices.map((p) => (
              <Radio key={p._id} value={p.array}>
                {p.name}
              </Radio>
            ))}
          </Radio.Group>

          <button className="btn btn-outline-danger mt-4 w-100 fw-semibold" onClick={handleResetFilters}>
            RESET FILTERS
          </button>
        </div>

        {/* Products Section */}
        <div className="col-md-9">
          <h2 className="text-center mb-4 text-uppercase text-primary fw-bold">All Products</h2>
          <div className="row">
            {products.map((p) => (
              <div className="col-md-4 mb-4" key={p._id}>
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  <img
  src={`/api/v1/product/product-photo/${p._id}`}
  alt={p.name}
  className="card-img-top"
  style={{
    height: "180px",
    width: "100%",
    objectFit: "contain",
    padding: "8px",
    backgroundColor: "#f8f9fa", 
    borderTopLeftRadius: "14px",
    borderTopRightRadius: "14px",
  }}
/>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title text-dark">{p.name}</h5>
                      <p className="card-text text-secondary">
                        {p.description?.substring(0, 60)}...
                      </p>
                      <p className="fw-bold text-danger">₹{p.price}</p>
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-outline-primary w-50"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-success w-50"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem("cart", JSON.stringify([...cart, p]));
                          toast.success("Item Added to cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {products.length < total && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-primary px-4 py-2 fw-semibold"
                onClick={() => setPage((prev) => prev + 1)}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
