import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { CiShoppingCart } from "react-icons/ci";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-2">
      <div className="container-fluid px-4">
        <Link to="/" className="navbar-brand fw-bold text-primary">
        <img src="/images/log.png" style={{ height: "40px", objectFit: "contain" }}/>
           E-Shop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {/* Search */}
            <li className="nav-item">
              <SearchInput />
            </li>

            {/* Home */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/categories"
                role="button"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Auth */}
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                >
                  {auth?.user?.name}
                </span>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            {/* Cart */}
            <li className="nav-item">
  <NavLink to="/cart" className="nav-link d-flex align-items-center position-relative">
    <CiShoppingCart className="fs-4 text-dark" />
    <Badge
      count={cart?.length}
      offset={[-8, 0]}
      showZero
      className="position-absolute top-0 start-100 translate-middle"
      style={{
        backgroundColor: "#f87171",
        color: "#fff",
        fontSize: "0.7rem",
        padding: "0 6px",
        borderRadius: "50%",
      }}
    />
    <span className="ms-2 d-none d-md-inline"></span>
  </NavLink>
</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
