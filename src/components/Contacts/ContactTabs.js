import React, { useState } from "react";
import ContactTable from "./ContactTable";
import TableOptions from "./TableOptions";

export default function ContactTabs({
  user,
  api,
  send_friend_request,
  accept_friend_request,
  decline_friend_request,
  unsend_friend_request,
  remove_friend,
}) {
  const [users, setUsers] = useState([]);

  async function fetch_users(query) {
    try {
      const queryString =
        "?" +
        Object.entries(query)
          .map((entry) => {
            const key = entry[0];
            const value = entry[1];
            return `${key}=${value}`;
          })
          .filter((entry) => {
            const value = entry.split("=")[1];
            if (
              value === "null" ||
              value === "undefined" ||
              value.length <= 0
            ) {
              return false;
            }
            return true;
          })
          .join("&");
      const response = await fetch(`${api}/users${queryString}`);
      const result = await response.json();
      setUsers(result);
      console.log(result);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-link active"
            id="nav-friends-tab"
            data-toggle="tab"
            href="#nav-friends"
            role="tab"
            aria-controls="nav-friends"
            aria-selected="true"
          >
            My Friends
          </a>
          <a
            className="nav-link"
            id="nav-requests-tab"
            data-toggle="tab"
            href="#nav-requests"
            role="tab"
            aria-controls="nav-requests"
            aria-selected="false"
          >
            Friend Requests
          </a>
          <a
            className="nav-link"
            id="nav-find-tab"
            data-toggle="tab"
            href="#nav-find"
            role="tab"
            aria-controls="nav-find"
            aria-selected="false"
          >
            Find Friends
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-friends"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          {user.contacts.length === 0 && (
            <p>
              You have no contacts. Head over to the Find tab to add some
              friends!
            </p>
          )}
          {user.contacts.map((contact) => {
            return <p>{contact.name}</p>;
          })}
        </div>
        <div
          className="tab-pane fade"
          id="nav-requests"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          Requests
        </div>
        <div
          className="tab-pane fade"
          id="nav-find"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <TableOptions fetch_users={(query) => fetch_users(query)} />
          <ContactTable
            data={users}
            user={user}
            users={users}
            send_friend_request={(data) => send_friend_request(data)}
            remove_friend={(data) => remove_friend(data)}
            accept_friend_request={(data) => accept_friend_request(data)}
            decline_friend_request={(data) => decline_friend_request(data)}
            unsend_friend_request={(data) => unsend_friend_request(data)}
          />
        </div>
      </div>
    </div>
  );
}
