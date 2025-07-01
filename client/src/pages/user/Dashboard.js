import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid py-4 px-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div
              className="card shadow-sm p-4"
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: "14px",
                border: "1px solid #E2E8F0"
              }}
            >
              <h4 className="mb-4 text-primary fw-bold">User Information</h4>
              <div className="mb-3">
                <label className="form-label text-muted">Name</label>
                <div className="fw-semibold fs-5">{auth?.user?.name}</div>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Email</label>
                <div className="fw-semibold fs-5">{auth?.user?.email}</div>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Address</label>
                <div className="fw-semibold fs-5">{auth?.user?.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
