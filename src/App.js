import React from "react";
import Login from "./components/Auth/Login";
import Chat from "./views/Chat";
import Navbar from "./components/Layout/Navbar";
import Signup from "./components/Auth/Signup";
import Notification from "./components/Layout/Notification";
import ContactTabs from "./components/Contacts/ContactTabs";

class App extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      user: null,
      loggedIn: false,
      route: "Login",
      registered: false,
      contacts: [],
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.renderRoute = this.renderRoute.bind(this);
    this.pushNotification = this.pushNotification.bind(this);
    this.renderNotification = this.renderNotification.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
    this.send_friend_request = this.send_friend_request.bind(this);
    this.remove_friend = this.remove_friend.bind(this);
    this.accept_friend_request = this.accept_friend_request.bind(this);
    this.decline_friend_request = this.decline_friend_request.bind(this);
    this.unsend_friend_request = this.unsend_friend_request.bind(this);
    this.get_contact_status = this.get_contact_status.bind(this);
    this.fetch_contacts = this.fetch_contacts.bind(this);
  }

  changeRoute(route) {
    this.setState({ route });
  }

  get_contact_status(contact_id) {
    if (this.state.user.contacts.includes(contact_id)) {
      return "Contact";
    } else if (this.state.user.incoming_requests.includes(contact_id)) {
      return "Incoming";
    } else if (this.state.user.outgoing_requests.includes(contact_id)) {
      return "Outgoing";
    } else {
      return "Unknown";
    }
  }

  send_friend_request(data) {
    console.log("sending friend request to ", data.contact_id);
    const user = this.state.user;
    user.outgoing_requests = [...user.outgoing_requests, data.contact_id];
    this.setState({
      user,
    });
    console.log(this.state.user);
  }

  remove_friend(data) {
    console.log("removing friend with id ", data.contact_id);
    const user = this.state.user;
    user.contacts = user.contacts.filter((id) => id !== data.contact_id);
    this.setState({
      user,
    });
  }

  accept_friend_request(data) {
    console.log("accepting friend request from ", data.contact_id);
    const user = this.state.user;
    user.contacts = [...user.contacts, data.contact_id];
    this.setState({
      user,
    });
  }

  decline_friend_request(data) {
    console.log("declining friend request from ", data.contact_id);
    const user = this.state.user;
    user.incoming_requests = user.incoming_requests.filter(
      (id) => id !== data.contact_id
    );
    this.setState({ user });
  }

  unsend_friend_request(data) {
    console.log("unsending friend request to ", data.contact_id);
    const user = this.state.user;
    user.outgoing_requests = user.outgoing_requests.filter(
      (id) => id !== data.contact_id
    );
    this.setState({ user });
  }

  async fetch_contacts(user_id) {
    try {
      const response = await fetch(`${this.props.api}/contacts/${user_id}`);
      const result = await response.json();
      console.log("CONTACTS", result);
      this.setState({ contacts: result });
    } catch (err) {
      alert(err.message);
    }
  }

  renderRoute() {
    switch (this.state.route) {
      case "Login":
        return <Login login={(data) => this.login(data)} />;
      case "Chat":
        return (
          <Chat
            user={this.state.user}
            api={this.props.api}
            socket={this.props.socket}
            pushNotification={(notification) =>
              this.pushNotification(notification)
            }
          />
        );
      case "Contacts":
        return (
          <ContactTabs
            api={this.props.api}
            send_friend_request={(data) => this.send_friend_request(data)}
            remove_friend={(data) => this.remove_friend(data)}
            accept_friend_request={(data) => this.accept_friend_request(data)}
            decline_friend_request={(data) => this.decline_friend_request(data)}
            unsend_friend_request={(data) => this.unsend_friend_request(data)}
            user_id={this.state.user._id}
            user_contacts={this.state.contacts}
            get_contact_status={(contact_id) =>
              this.get_contact_status(contact_id)
            }
          />
        );
      case "Signup":
        return <Signup signup={(data) => this.signup(data)} />;
      default:
        return <Login login={(data) => this.login(data)} />;
    }
  }

  async componentDidMount() {
    const user_id = sessionStorage.getItem("user_id");
    if (user_id) {
      try {
        const response = await fetch(`${this.props.api}/users/${user_id}`);
        if (response.ok) {
          const user = await response.json();
          this.props.socket.emit("register", user);
          console.log("registered", this.state.registered);
          this.fetch_contacts(user._id);
          this.setState({
            user,
            loggedIn: true,
            route: "Chat",
            registered: true,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  logout() {
    sessionStorage.removeItem("user_id");
    this.setState({
      user: null,
      loggedIn: false,
      route: "Login",
    });
  }

  signup() {
    console.log("signup");
  }

  async login(data) {
    try {
      const response = await fetch(this.props.api + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      const user = await response.json();

      if (!response.ok) {
        return alert(user.message);
      }

      sessionStorage.setItem("user_id", user._id);
      this.props.socket.emit("register", user);

      this.setState({
        user,
        loggedIn: true,
        route: "Chat",
        registered: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  pushNotification(notification) {
    this.setState({
      notification,
    });
  }

  renderNotification() {
    const notification = this.state.notification;
    this.setState({
      notification: null,
    });
    return (
      <Notification
        name={notification.name}
        time={notification.time}
        content={notification.content}
      />
    );
  }

  render() {
    return (
      <div id="App">
        <Navbar
          loggedIn={this.state.loggedIn}
          name={this.state.user ? this.state.user.name : null}
          logout={this.logout}
          signup={this.signup}
          route={this.state.route}
          changeRoute={(route) => this.changeRoute(route)}
        />
        {this.state.loggedIn &&
          this.state.notification &&
          this.renderNotification()}

        {this.state.route === "Login" && this.renderRoute()}

        {this.state.route !== "Login" &&
          this.state.loggedIn &&
          this.renderRoute()}
      </div>
    );
  }
}

export default App;
