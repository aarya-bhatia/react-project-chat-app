import React from "react";
import ContactRow from "./ContactRow";

export default function ContactTable(props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Privacy</th>
          <th scope="col">Gender</th>
          <th scope="col">Country</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((contact, index) => {
          console.log(contact);
          return (
            <ContactRow
              index={index}
              name={contact.name}
              country={contact.country}
              gender={contact.gender}
              privacy={contact.privacy}
              _id={contact._id}
              key={contact._id}
              send_friend_request={(data) => props.send_friend_request(data)}
              remove_friend={(data) => props.remove_friend(data)}
              accept_friend_request={(data) =>
                props.accept_friend_request(data)
              }
              decline_friend_request={(data) =>
                props.decline_friend_request(data)
              }
              unsend_friend_request={(data) =>
                props.unsend_friend_request(data)
              }
              user_id={props.user_id}
              get_contact_status={(contact_id) =>
                props.get_contact_status(contact_id)
              }
            />
          );
        })}
      </tbody>
    </table>
  );
}
