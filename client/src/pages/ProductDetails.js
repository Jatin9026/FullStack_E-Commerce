import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`Product - ${product?.name}`}>
      <div className="container py-5">
        <div className="row align-items-center mb-5">
          {/* Product Image */}
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              style={{ height: "300px", objectFit: "contain", background: "#f8f9fa", padding: "20px", borderRadius: "12px" }}
              className="img-fluid shadow-sm"
            />
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <h2 className="text-primary fw-bold mb-3">{product.name}</h2>
            <p className="text-muted mb-2">{product.description}</p>
            <h4 className="text-danger fw-semibold mb-2">₹ {product.price}</h4>
            <p className="text-secondary mb-3">Category: <span className="fw-medium">{product?.category?.name}</span></p>
            <button
              className="btn btn-success"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem("cart", JSON.stringify([...cart, product]));
                toast.success("Item added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        <hr />
        <div className="mt-5">
          <h4 className="mb-4 fw-semibold text-primary">Similar Products</h4>
          <div className="row">
            {relatedProducts?.length < 1 ? (
              <p className="text-muted">No similar products found</p>
            ) : (
              relatedProducts?.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <div
                    className="card h-100 shadow-sm border-0"
                    style={{ borderRadius: "14px", overflow: "hidden" }}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "180px", objectFit: "contain", padding: "10px", backgroundColor: "#f8f9fa" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text text-muted">{p.description.substring(0, 60)}...</p>
                        <p className="fw-bold text-danger">₹ {p.price}</p>
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
                            toast.success("Item added to cart");
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
