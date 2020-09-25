import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import io from "socket.io-client";

const api = "http://localhost:4000";

console.log("connecting");
const socket = io(api, { reconnectionAttempts: 5 });

socket.on("connect", function () {
  console.log("you're connected");
});

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} api={api} />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
