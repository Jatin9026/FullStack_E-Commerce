import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
  };

  return (
    <Layout title={"Search Results"}>
      <div className="container mt-4">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6 className="text-muted">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Product(s)`}
          </h6>
        </div>

        <div className="row mt-4">
          {values?.results.map((p) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 mb-4"
              key={p._id}
            >
              <div className="card h-100 shadow-sm">
                <div style={{ height: "220px", overflow: "hidden" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">
                    {p.description?.substring(0, 60)}...
                  </p>
                  <p className="fw-bold text-primary mb-3">
                    ₹{p.price}
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleAddToCart(p)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
