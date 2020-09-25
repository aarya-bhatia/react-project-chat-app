import React from "react";

export default function Navbar(props) {
  return (
    <nav id="mainNav" className="navbar navbar-expand-lg navbar-light bg-light">
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

      <div
        className="collapse navbar-collapse py-2"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => props.changeRoute("Chat")}
            >
              Chats
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => props.changeRoute("Contacts")}
            >
              Contacts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={props.logout}>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
