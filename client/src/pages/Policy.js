import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/images/contactus.jpeg"
              alt="Privacy Policy"
              className="img-fluid rounded shadow-sm"
            />
          </div>

          {/* Content Section */}
          <div className="col-md-6">
            <h2 className="mb-3 text-primary fw-bold">Our Privacy Policy</h2>
            <p>
              At <strong>E-Shop</strong>, we are committed to safeguarding your privacy. This policy outlines how we collect, use, and protect your personal data when you interact with our platform.
            </p>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                ✅ <strong>Data Collection:</strong> We collect your name, email, address, and transaction details when you register or make a purchase.
              </li>
              <li className="mb-2">
                ✅ <strong>Data Usage:</strong> Your data helps us process orders, enhance user experience, and improve our services.
              </li>
              <li className="mb-2">
                ✅ <strong>Security:</strong> We implement modern security practices to prevent unauthorized access and data breaches.
              </li>
              <li className="mb-2">
                ✅ <strong>Third Parties:</strong> We do not sell or share your personal data with external entities unless legally required.
              </li>
              <li className="mb-2">
                ✅ <strong>Cookies:</strong> We use cookies to personalize content and analyze site traffic.
              </li>
              <li className="mb-2">
                ✅ <strong>Your Rights:</strong> You have full control to access, modify, or delete your data anytime from your account settings.
              </li>
              <li className="mb-2">
                ✅ <strong>Policy Updates:</strong> We reserve the right to update our privacy terms. Any changes will be communicated transparently.
              </li>
            </ul>
            <p className="mt-3">
              For any concerns or queries regarding your privacy, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
