import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="main-navbar navbar navbar-expand-lg navbar-light position-relative">
        <div className="toggles-bars position-absolute">
          {/* <i class="fas fa-bars"></i> */}
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
        {/* <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button> --> */}
        <Link to='/' className="navbar-brand main-logo white-logo" onClick={() => window.location.reload()}>
          <img src="asstes/image/white-logo.png" alt="" />
        </Link>
        {/* <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
            <a class="nav-item nav-link" href="#">
              Features
            </a>
            <a class="nav-item nav-link" href="#">
              Pricing
            </a>
            <a class="nav-item nav-link disabled" href="#">
              Disabled
            </a>
          </div>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
