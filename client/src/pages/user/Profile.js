import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth?.user || {};
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("https://e-commerce-backend-mfvo.onrender.com/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div
              className="p-4 shadow-sm"
              style={{
                backgroundColor: "#F9FAFB",
                borderRadius: "14px",
                border: "1px solid #E2E8F0",
              }}
            >
              <h4 className="mb-4 text-primary fw-bold">Update Profile</h4>
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    disabled
                    placeholder="Email Address"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="New Password (Optional)"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Shipping Address"
                    required
                  />
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary px-4">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
