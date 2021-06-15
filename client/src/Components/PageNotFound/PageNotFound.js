import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>OOPS!!!</h1>
      <h3>404 Page Not Found</h3>
      <Link className="link" to="/">
        Go To Home
      </Link>
    </div>
  );
};

export default PageNotFound;
