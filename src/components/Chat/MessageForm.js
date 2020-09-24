import React, { useState } from "react";

export default function MessageFom({ sendMessage }) {
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (content && content.length > 0) {
      sendMessage(content);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <input
          id="message"
          type="text"
          placeholder="Aa"
          className="form-control"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </form>
  );
}
