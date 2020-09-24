import React from "react";
import ChatView from "../components/Chat/ChatView";

class Chat extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      loading: true,
      chats: [],
      active: 0,
    };

    this.new_message = this.new_message.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.createNewMessage = this.createNewMessage.bind(this);
    this.addMessageToChat = this.addMessageToChat.bind(this);
  }

  new_message(message) {
    console.log(message);
    this.addMessageToChat(message);
  }

  async componentDidMount() {
    // register socket event listener
    this.props.socket.on("new_message", (message) => this.new_message(message));

    // fetch chats from server
    try {
      const response = await fetch(
        `${this.props.api}/chats/${this.props.user._id}`
      );
      const { chats } = await response.json();
      this.setState({
        chats,
        loading: false,
      });
      console.log(chats);
    } catch (err) {
      console.log(err);
    }
  }

  createNewMessage(content) {
    const current_chat = this.currentChat(this.state.chats, this.state.active);
    const chat_id = current_chat._id;
    const contact = this.findContact(current_chat, this.props.user._id);
    const recipient_id = contact._id;
    const author_id = this.props.user._id;
    const author_name = this.props.user.name;

    const message = {
      chat_id,
      recipient_id,
      content,
      author_id,
      author_name,
    };

    return message;
  }

  async sendMessage(content) {
    const message = this.createNewMessage(content);

    try {
      const response = await fetch(`${this.props.api}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(message),
      });

      const result = await response.json();
      console.log(result);

      this.addMessageToChat(result);
    } catch (err) {
      alert(err);
    }
  }

  addMessageToChat(message) {
    const chats = this.state.chats;
    this.setState({
      chats: chats.map((chat) => {
        if (chat._id === message.chat_id) {
          return Object.assign({ messages: [...chat.messages, message] }, chat);
        } else {
          return chat;
        }
      }),
    });
  }

  findContact(chat, user_id) {
    return chat.users.filter((user) => user._id !== user_id)[0];
  }

  currentChat(chats, active) {
    return chats[active];
  }

  render() {
    if (this.state.loading) {
      return <h5>Loading</h5>;
    }

    if (this.state.chats.length === 0) {
      return <p>You have no chats!</p>;
    }

    return (
      <ChatView
        chats={this.state.chats}
        user_id={this.props.user._id}
        active={this.state.active}
        findContact={(chat, user_id) => this.findContact(chat, user_id)}
        sendMessage={(content) => this.sendMessage(content)}
      />
    );
  }
}

export default Chat;
