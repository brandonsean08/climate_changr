import React from "react";
import "./HeaderItems.css";

function HeaderItems() {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            View Type
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item">Country</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item">Month</a>
          </div>
        </li>
      </ul>
      <div className="header-btn-group"></div>
    </div>
  );
}

export default HeaderItems;
