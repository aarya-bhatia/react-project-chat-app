import React, { Component } from "react";
import MessageRecieved from "./MessageRecieved";
import MessageSent from "./MessageSent";

export default class MessagesContainer extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.containerBottom = React.createRef();
  }

  async componentDidMount() {
    // mark all messages as seen
    try {
      const response = await fetch(
        `${this.props.api}/chats/${this.props.chat_id}/seen-by/${this.props.user_id}`,
        {
          method: "POST",
        }
      );
      console.log("read messages", response);
    } catch (err) {
      console.log(err);
    }
  }

  componentDidUpdate() {
    this.containerBottom.current.scrollIntoView({ behavious: "smooth" });
  }

  render() {
    return (
      <div className="chat-body p-4" style={{ maxHeight: "70vh" }}>
        {this.props.messages.map((message) => {
          if (message.author_name === this.props.contact_name) {
            return (
              <MessageRecieved
                name={message.author_name}
                time={message.time}
                content={message.content}
                key={message._id}
              />
            );
          } else {
            return (
              <MessageSent
                name={message.author_name}
                time={message.time}
                content={message.content}
                key={message._id}
              />
            );
          }
        })}

        <div ref={this.containerBottom} />
      </div>
    );
  }
}
