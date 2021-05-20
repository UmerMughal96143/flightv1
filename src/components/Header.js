import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const Header = ({ history }) => {
    return (
    <>
      {history.location.pathname == "/" ? (
        <header>
          <nav className="main-navbar navbar navbar-expand-lg navbar-light position-relative">
            <div className="toggles-bars position-absolute">
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </div>
            <Link
              to="/"
              className="navbar-brand main-logo white-logo"
              onClick={() => window.location.reload()}
            >
              <img src="asstes/image/white-logo.svg" alt="" />
            </Link>
          </nav>
        </header>
      ) : history.location.pathname == "/atechypay" ?  (
        <header>
          <nav className="atechypay-navbar main-navbar-1 navbar navbar-expand-lg navbar-light position-relative">
            <Link
              to="/"
              className="navbar-brand main-logo white-logo"
              onClick={() => window.location.reload()}
            >
              <img class="atechypay-logo" src="asstes/image/atechy-logo.svg" alt="" />
            </Link>
          </nav>
        </header>
      ): (
        <header>
          <nav className="main-navbar-1 navbar navbar-expand-lg navbar-light position-relative">
            <Link
              to="/"
              className="navbar-brand main-logo white-logo"
              onClick={() => window.location.reload()}
            >
              <img class="dark-logo" src="asstes/image/dark-logo.svg" alt="" />
              <img class="dark-logo" src="asstes/image/atechy-logo.svg" alt="" />
            </Link>
          </nav>
        </header>
      )}
    </>
  );
};

export default withRouter(Header);
