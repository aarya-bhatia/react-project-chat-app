import React from "react";

export default function MessageRecieved({ name, time, content }) {
  return (
    <div className="card w-75 mb-4">
      <div className="card-body">
        <p className="card-title text-muted">
          {name} | {time}
        </p>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
}
