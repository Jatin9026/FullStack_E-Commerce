import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Table, Tag } from "antd";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const getAllUsers = async () => {
    try {
      const res = await axios.get("/api/v1/auth/all-users");
      if (res.data?.success) {
        setUsers(res.data.users);
      } else {
        toast.error("Failed to load users");
      }
    } catch (err) {
      console.error("Error loading users", err);
      toast.error("Error fetching user list");
    }
  };

  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="fw-semibold">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      responsive: ["lg"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) =>
        role === 1 ? (
          <Tag color="red">Admin</Tag>
        ) : (
          <Tag color="green">User</Tag>
        ),
    },
  ];

  return (
    <Layout title="Dashboard - All Users">
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4 className="mb-4 text-primary fw-bold">Registered Users</h4>
            <Table
              columns={columns}
              dataSource={users}
              rowKey="_id"
              bordered
              size="middle"
              pagination={{ pageSize: 8 }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
