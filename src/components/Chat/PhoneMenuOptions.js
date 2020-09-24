import React from "react";

const PhoneMenuOptions = (props) => (
  <div className="col-sm-12">
    <ul className="nav d-md-none">
      <li className="nav-item">
        <a className="nav-link" href="#">
          Show Chats
        </a>
      </li>
    </ul>
  </div>
);

{
  /* On mobile, chat list is on a separate page */
}

export default PhoneMenuOptions;
