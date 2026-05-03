import React from "react";
import { Link } from "react-router-dom";
import "./DashBoardNavbar.css";

const DashboardNavbar = () => {
  return (
    <nav>
      <Link to="/dashboard">
        <div>
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNavbar;