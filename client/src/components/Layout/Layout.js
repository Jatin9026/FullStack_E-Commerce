import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom"; 

const Layout = ({ children, title, description, keywords, author }) => {
  const location = useLocation();

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      {location.pathname === "/" && (
        <img
          src="/images/banner.jpg"
          alt="banner"
          className="w-100"
          style={{ maxHeight: "350px", objectFit: "cover", borderBottom: "4px solid #eee" }}
        />
      )}

      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>

      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default Layout;
