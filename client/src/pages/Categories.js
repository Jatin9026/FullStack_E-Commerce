import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container py-4">
        <div className="row">
          {categories && categories.length > 0 ? (
            categories.map((c) => (
              <div className="col-md-6 col-lg-4 mb-3" key={c._id}>
                <Link to={`/category/${c.slug}`} className="btn btn-primary w-100">
                  {c.name}
                </Link>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No categories available.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
