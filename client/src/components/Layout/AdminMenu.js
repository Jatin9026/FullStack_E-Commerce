import React from "react";
import { NavLink } from "react-router-dom";
import { FaBox, FaUsers, FaClipboardList, FaPlus, FaTags } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div className="p-3 shadow-sm bg-light rounded-3">
      <h4 className="text-center mb-4 text-primary">Admin Panel</h4>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <FaTags className="me-2" /> Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <FaPlus className="me-2" /> Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <FaBox className="me-2" /> Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <FaUsers className="me-2" /> Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action d-flex align-items-center"
        >
          <FaClipboardList className="me-2" /> Orders
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
