import React, { useState } from "react";

export default function Login(props) {
  const [data, setData] = useState({ email: "", password: "" });

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.login(data);
  }

  return (
    <div className="row container">
      <form onSubmit={handleSubmit}>
        <div className="form-group col s12 m6">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group col s12 m6">
          <label htmlFor="email">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group col s12 center">
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
