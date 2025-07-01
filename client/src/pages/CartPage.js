import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getCartTotal = () => {
    return cart?.reduce((acc, item) => acc + item.price, 0) || 0;
  };

  const formatPrice = (amount) => {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const removeFromCart = (productId) => {
    try {
      const updated = cart.filter((item) => item._id !== productId);
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!auth?.user) {
        alert("Please login to proceed with checkout");
        navigate("/login");
        return;
      }

      if (!auth?.user?.address) {
        alert("Please add your address to proceed with checkout");
        navigate("/dashboard/user/profile");
        return;
      }

   
      // Get Razorpay key
      const { data: keyData } = await axios.get("https://e-commerce-backend-mfvo.onrender.com/api/v1/payment/getkey");
    

      // Create Razorpay order
      const { data: orderData } = await axios.post("https://e-commerce-backend-mfvo.onrender.com/api/v1/payment/razorpay", {
        amount: getCartTotal(),
      });
    

      if (!orderData.success) {
        throw new Error("Failed to create payment order");
      }

      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: "INR",
        name: "E-Shop",
        description: "Payment for your order",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
          
           
            const verifyRes = await axios.post(
              "https://e-commerce-backend-mfvo.onrender.com/api/v1/payment/paymentverification",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart: cart,
              },
              {
                headers: {
                  Authorization: `Bearer ${auth?.token}`,
                },
              }
            );

            console.log("Payment verification response:", verifyRes.data);

            if (verifyRes?.data?.success) {
              // Clear cart
              setCart([]);
              localStorage.removeItem("cart");
              
              // Navigate to success page
              navigate(`/paymentsuccess?reference=${response.razorpay_payment_id}`);
            } else {
              console.error("Payment verification failed:", verifyRes.data.message);
              alert(`Payment verification failed: ${verifyRes.data.message || "Unknown error"}`);
            }
          } catch (err) {
            console.error(" Error in payment verification:", err);
            alert("Error in payment verification. Please contact support.");
          }
        },
        prefill: {
          name: auth?.user?.name || "",
          email: auth?.user?.email || "",
          contact: auth?.user?.phone || "999-999-9999",
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
        },
        modal: {
          ondismiss: function() {
            console.log(" Payment cancelled by user");
          }
        }
      };

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.");
      }

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error(" Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.error(" Checkout Error:", error);
      alert(`Checkout failed: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <Layout title="Your Cart">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h3 className="mb-3">Shopping Cart</h3>
            {cart?.length > 0 ? (
              cart.map((product, index) => (
                <div className="card mb-3 shadow-sm" key={product._id || index}>
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col-md-3">
                        <img
                          src={`/api/v1/product/product-photo/${product._id}`}
                          className="img-fluid rounded"
                          alt={product.name}
                          style={{ height: "120px", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-muted">
                          {product.description?.substring(0, 100)}
                          {product.description?.length > 100 ? "..." : ""}
                        </p>
                        <p className="text-success fw-bold fs-5">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="col-md-3 text-end">
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="btn btn-outline-danger"
                        >
                          <i className="bi bi-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <div className="card">
                  <div className="card-body">
                    <h5>Your cart is empty</h5>
                    <p className="text-muted">Add some products to get started!</p>
                    <a href="/" className="btn btn-primary">
                      Continue Shopping
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Items in cart:</span>
                  <span className="fw-bold">{cart?.length || 0}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span className="fs-5">Total:</span>
                  <span className="fs-5 fw-bold text-success">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                
                {cart?.length > 0 ? (
                  <div>
                    {auth?.user ? (
                      auth?.user?.address ? (
                        <div>
                          <div className="mb-3">
                            <small className="text-muted">Shipping Address:</small>
                            <p className="mb-0">{auth.user.address}</p>
                          </div>
                          <button 
                            className="btn btn-success w-100 btn-lg" 
                            onClick={handleCheckout}
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="alert alert-warning">
                            Please add your shipping address to proceed.
                          </div>
                          <button
                            className="btn btn-warning w-100"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Add Address
                          </button>
                        </div>
                      )
                    ) : (
                      <div>
                        <div className="alert alert-info">
                          Please login to proceed with checkout.
                        </div>
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => navigate("/login")}
                        >
                          Login to Checkout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="btn btn-secondary w-100" disabled>
                    Cart is Empty
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;