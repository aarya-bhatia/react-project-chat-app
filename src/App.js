import React from "react";
import Login from "./components/Auth/Login";
import Chat from "./views/Chat";
import Navbar from "./components/Layout/Navbar";
import Signup from "./components/Auth/Signup";

class App extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      user: null,
      loggedIn: false,
      route: "Login",
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.renderRoute = this.renderRoute.bind(this);
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
          />
        );
      case "Signup":
        return <Signup signup={(data) => this.signup(data)} />;
      default:
        return <Login login={(data) => this.login(data)} />;
    }
  }

  async componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      try {
        const response = await fetch(`${this.props.api}/users/${user_id}`);
        if (response.ok) {
          const user = await response.json();
          this.setState({
            user,
            loggedIn: true,
            route: "Chat",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  logout() {
    localStorage.removeItem("user_id");
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

      localStorage.setItem("user_id", user._id);

      this.setState({
        user,
        loggedIn: true,
        route: "Chat",
      });

      this.props.socket.emit("register", user);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container">
        <Navbar
          loggedIn={this.state.loggedIn}
          name={this.state.user ? this.state.user.name : null}
          logout={this.logout}
          signup={this.signup}
        />
        {this.renderRoute()}
      </div>
    );
  }
}

export default App;
