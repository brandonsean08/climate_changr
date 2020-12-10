import { React } from "react";
import "./Header.css";
import HeaderItems from "../HeaderItems/HeaderItems";

function Header () {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a
          className="navbar-brand"
          href="#"
        >
          Climate Changr
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <HeaderItems/>
      </nav>
    );
}

export default Header;
