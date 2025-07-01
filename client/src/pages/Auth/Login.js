import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [auth, setAuth, { login }] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://e-commerce-backend-mfvo.onrender.com/api/v1/auth/login", { email, password });

      if (res.data.success) {
        toast.success(res.data.message);
        login(res.data.user, res.data.token);

        const redirectPath =
          location.state?.from ||
          (res.data.user.role === 1
            ? "/dashboard/admin"
            : "/dashboard/user");

        navigate(redirectPath);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login - E-Shop">
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ minHeight: "92vh", background: "#f4f6f8" }}
      >
        <div className="col-md-4 col-sm-10">
          <div className="card shadow rounded-4 p-4 border-0">
            <h3 className="text-center mb-3 text-primary fw-bold">
              Welcome Back
            </h3>
            <p
              className="text-center text-muted mb-4"
              style={{ fontSize: "0.95rem" }}
            >
              Please login to continue shopping
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  required
                  autoFocus
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </form>

            <div className="text-end mt-2">
              <span
                role="button"
                onClick={() => navigate("/forgot-password")}
                className="text-primary"
                style={{
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Forgot password?
              </span>
            </div>

            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Don't have an account?
                <span
                  role="button"
                  onClick={() => navigate("/register")}
                  className="text-primary fw-semibold ms-1"
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Register here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
