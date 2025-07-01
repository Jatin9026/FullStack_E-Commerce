import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !quantity || !category || !photo) {
      toast.error("All fields are required");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Product creation failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow-sm border-0 rounded-4 p-4">
              <h3 className="text-primary fw-bold mb-4">Add New Product</h3>

              {/* Select Category */}
              <div className="mb-3">
                <label className="form-label fw-medium">Category</label>
                <Select
                  bordered
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="w-100"
                  onChange={(value) => setCategory(value)}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* Upload Image */}
              <div className="mb-3">
                <label className="form-label fw-medium">Product Photo</label>
                <label className="btn btn-outline-secondary w-100">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Preview Image */}
              {photo && (
                <div className="mb-3 text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product"
                    height="200px"
                    className="img img-responsive rounded shadow-sm"
                  />
                </div>
              )}

              {/* Product Fields */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Enter Product Description"
                  className="form-control"
                  rows="3"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-medium">Shipping Available?</label>
                <Select
                  bordered
                  placeholder="Select Shipping"
                  size="large"
                  className="w-100"
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="text-end">
                <button
                  className="btn btn-primary px-4 py-2 fw-semibold rounded-pill"
                  onClick={handleCreate}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
