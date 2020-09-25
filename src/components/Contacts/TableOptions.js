import React, { useState } from "react";

export default function TableOptions(props) {
  const [query, setQuery] = useState({
    name: null,
    country: null,
    gender: null,
  });

  function handleChange(e) {
    setQuery({
      ...query,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.fetch_users(query);
  }

  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <div className="form-group m-2">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          className="form-control mx-2"
          id="name"
          placeholder="Name"
          onChange={handleChange}
        />
      </div>

      <div className="form-group m-2">
        <label htmlFor="Country" className="sr-only">
          Country
        </label>
        <input
          type="text"
          className="form-control mx-2"
          id="country"
          placeholder="Country"
          onChange={handleChange}
        />
      </div>

      <div className="form-group m-2">
        <select className="form-control" id="gender" onChange={handleChange}>
          <option>Both</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <button className="btn btn-sm btn-success" type="submit">
        <i className="material-icons"> search </i>
      </button>
    </form>
  );
}
