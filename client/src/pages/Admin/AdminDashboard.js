import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { FaUserShield, FaEnvelope, FaPhone } from "react-icons/fa";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="Admin Dashboard">
      <div className="container-fluid py-4 px-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* Admin Info Card */}
          <div className="col-md-9">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "16px", backgroundColor: "#f8fafc" }}
            >
              <div className="card-body">
                <h4 className="card-title mb-4 text-primary fw-bold border-bottom pb-2">
                  <FaUserShield className="me-2" />
                  Admin Profile Overview
                </h4>
                <div className="mb-3">
                  <h6 className="text-muted">Full Name</h6>
                  <p className="fs-5 fw-semibold">{auth?.user?.name}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">Email Address</h6>
                  <p className="fs-6"><FaEnvelope className="me-2" />{auth?.user?.email}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">Contact Number</h6>
                  <p className="fs-6"><FaPhone className="me-2" />{auth?.user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
