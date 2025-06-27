import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-4">
      <div className="container-fluid ">
        <a
          className="navbar-brand"
          href="#"
          style={{ fontFamily: "Georgia, serif" }}
        >
          VaultFlow
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Accounts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/form">
                Transfer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/transcations">
                Transcations
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
