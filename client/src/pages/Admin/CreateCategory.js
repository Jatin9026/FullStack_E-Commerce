import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://e-commerce-backend-mfvo.onrender.com/api/v1/category/create-category", { name });
      if (data?.success) {
        toast.success(`${name} created successfully`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating category.");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-backend-mfvo.onrender.com/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://e-commerce-backend-mfvo.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} updated successfully`);
        setVisible(false);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating category.");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`https://e-commerce-backend-mfvo.onrender.com/api/v1/category/delete-category/${pId}`);
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting category.");
    }
  };

  return (
    <Layout title="Dashboard - Manage Categories">
      <div className="container-fluid py-4 px-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h3 className="text-primary fw-bold mb-4">Create New Category</h3>
              <div className="w-100 mb-4">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>

              <h4 className="text-secondary fw-semibold mb-3">Existing Categories</h4>
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Category Name</th>
                      <th scope="col" className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c, index) => (
                      <tr key={c._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{c.name}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(c._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Modal
                title="Edit Category"
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
