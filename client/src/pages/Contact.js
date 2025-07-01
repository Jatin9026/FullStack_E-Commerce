import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container py-5">
        <div className="row align-items-center shadow-sm rounded-4 overflow-hidden">
          {/* Left Image */}
          <div className="col-md-6 p-0">
            <img
              src="/images/contact.jpg"
              alt="Contact Us"
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>

          {/* Right Content */}
          <div className="col-md-6 bg-light p-5">
            <h2 className="text-center text-uppercase fw-bold text-primary mb-4">
              Contact Us
            </h2>
            <p className="text-muted mb-4 text-center">
              For any queries regarding products, orders, or support, feel free to reach out. We are available <strong>24×7</strong>.
            </p>

            <div className="d-flex align-items-center mb-3">
              <BiMailSend className="fs-4 text-primary me-3" />
              <span className="fs-6">jatingupta918306@gmail.com</span>
            </div>

            <div className="d-flex align-items-center mb-3">
              <BiPhoneCall className="fs-4 text-primary me-3" />
              <span className="fs-6">9026918306</span>
            </div>

            <div className="d-flex align-items-center">
              <BiSupport className="fs-4 text-primary me-3" />
              <span className="fs-6">1800-0000-0000 (Toll Free)</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
