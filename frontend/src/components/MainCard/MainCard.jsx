import { React } from "react";
import { Link } from "react-router-dom";

import "./MainCard.css";

const MainCard = () => {
  return (
    <div className="container">
      <Link to="/registration-form" style={{textDecoration: 'none'}}>
        <div className="card card0">
          <div className="border">
            <h2>Registration Form</h2>
          </div>
        </div>
      </Link>
      <Link to="/users-data" style={{textDecoration: 'none'}}>
        <div className="card card1">
          <div className="border">
            <h2>User Data</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainCard;
