import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Load single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`https://e-commerce-backend-mfvo.onrender.com/api/v1/product/get-product/${params.slug}`);
      const p = data.product;
      setId(p._id);
      setName(p.name);
      setDescription(p.description);
      setPrice(p.price);
      setQuantity(p.quantity);
      setShipping(p.shipping ? "1" : "0");
      setCategory(p.category._id);
    } catch (error) {
      toast.error("Failed to load product");
    }
  };

  // Load categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-mfvo.onrender.com/api/v1/category/get-category");
      if (data?.success) setCategories(data.category);
    } catch (error) {
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  // Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    productData.append("category", category);
    productData.append("shipping", shipping);
    if (photo) productData.append("photo", photo);

    try {
      const { data } = await axios.put(`https://e-commerce-backend-mfvo.onrender.com/api/v1/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`https://e-commerce-backend-mfvo.onrender.com/api/v1/product/delete-product/${id}`);
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <Layout title="Admin - Update Product">
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="card p-4 shadow-sm rounded-4">
              <h3 className="text-center text-primary fw-bold mb-4">Update Product</h3>

              <Select
                className="form-select mb-3"
                bordered={false}
                placeholder="Select Category"
                size="large"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary w-100">
                  {photo ? photo.name : "Upload Product Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="text-center mb-3">
                <img
                  src={photo ? URL.createObjectURL(photo) : `/api/v1/product/product-photo/${id}`}
                  alt="product"
                  height="200px"
                  className="img-fluid rounded-3 shadow-sm"
                />
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control mb-3"
                placeholder="Product Name"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control mb-3"
                placeholder="Product Description"
              />

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control mb-3"
                placeholder="Product Price"
              />

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control mb-3"
                placeholder="Product Quantity"
              />

              <Select
                className="form-select mb-3"
                bordered={false}
                size="large"
                value={shipping}
                onChange={(value) => setShipping(value)}
                placeholder="Shipping Available?"
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>

              <div className="d-flex gap-3">
                <button className="btn btn-success w-50 fw-semibold" onClick={handleUpdate}>
                  Save Changes
                </button>
                <button className="btn btn-outline-danger w-50 fw-semibold" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
