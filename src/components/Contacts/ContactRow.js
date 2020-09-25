import React from "react";

export default class ContactRow extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.action = this.action.bind(this);
    this.commitAction = this.commitAction.bind(this);
  }

  commitAction(action) {
    if (action === "ADD") {
      this.props.send_friend_request({
        user_id: this.props.user_id,
        contact_id: this.props._id,
      });
    }

    if (action === "REMOVE") {
      this.props.remove_friend({
        user_id: this.props.user_id,
        contact_id: this.props._id,
      });
    }

    if (action === "ACCEPT") {
      this.props.accept_friend_request({
        user_id: this.props.user_id,
        contact_id: this.props._id,
      });
    }

    if (action === "DECLINE") {
      this.props.decline_friend_request({
        user_id: this.props.user_id,
        contact_id: this.props._id,
      });
    }

    if (action === "CANCEL") {
      this.props.unsend_friend_request({
        user_id: this.props.user_id,
        contact_id: this.props._id,
      });
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
            CANCEL
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
    const status = this.props.get_contact_status(this.props._id);
    return (
      <tr>
        <th scope="row">{this.props.index}</th>
        <td>{this.props.name}</td>
        <td>
          {this.props.privacy === "Private" ? (
            <i className="material-icons">lock</i>
          ) : (
            <i className="material-icons">public</i>
          )}
        </td>
        <td>{this.props.gender}</td>
        <td>{this.props.country}</td>
        <td>{status}</td>
        <td>{this.action(status)}</td>
      </tr>
    );
  }
}
