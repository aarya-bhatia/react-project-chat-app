import React from "react";

// props = {user, name, gender, _id, country}
export default class ContactRow extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.status = this.status.bind(this);
    this.action = this.action.bind(this);
  }

  commitAction(action) {
    if (action === "ADD") {
      this.props.send_friend_request({
        user_id: this.props.user._id,
        contact_id: this.props._id,
      });
    }

    if (action === "REMOVE") {
      this.props.remove_friend({
        user_id: this.props.user._id,
        contact_id: this.props._id,
      });
    }

    if (action === "ACCEPT") {
      this.props.accept_friend_request({
        user_id: this.props.user._id,
        contact_id: this.props._id,
      });
    }

    if (action === "DECLINE") {
      this.props.decline_friend_request({
        user_id: this.props.user._id,
        contact_id: this.props._id,
      });
    }

    if (action === "CANCEL") {
      this.props.unsend_friend_request({
        user_id: this.props.user._id,
        contact_id: this.props._id,
      });
    }
  }

  status(contact) {
    if (this.props.user.contacts.includes(contact._id)) {
      return "Friends";
    } else if (this.props.user.incoming_requests.includes(contact._id)) {
      return "Incoming";
    } else if (this.props.user.outgoing_requests.includes(contact._id)) {
      return "Outgoing";
    } else {
      return "Unknown";
    }
  }

  action(status) {
    switch (status) {
      case "Contact":
        return (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => this.commitAction("REMOVE")}
          >
            REMOVE
          </button>
        );
      case "Incoming":
        return (
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => this.commitAction("ACCEPT")}
            >
              Accept
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => this.commitAction("DECLINE")}
            >
              Decline
            </button>
          </div>
        );
      case "Outgoing":
        return (
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => this.commitAction("CANCEL")}
          >
            Cancel Request
          </button>
        );
      case "Unknown":
        return (
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => this.commitAction("ADD")}
          >
            ADD
          </button>
        );
      default:
        return "";
    }
  }

  render() {
    const contact_status = this.status(this.props._id);
    return (
      <tr>
        <th scope="row">{this.props.index}</th>
        <td>{this.props.name}</td>
        <td>{this.props.gender}</td>
        <td>{this.props.country}</td>
        <td>{contact_status}</td>
        <td>{this.action(contact_status)}</td>
      </tr>
    );
  }
}
