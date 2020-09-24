import React from "react";

export default function ChatListItem({ name, content, count }) {
  return (
    <button
      type="button"
      className="list-group-item list-group-item-action list-group-item-info"
    >
      <div className="d-flex w-100 justify-content-between align-items-center">
        <h5 className="mb-1">{name}</h5>
        {count > 0 && (
          <span className="badge badge-primary badge-pill">10</span>
        )}
      </div>
      <p className="mb-1">{content}</p>
    </button>
  );
}
