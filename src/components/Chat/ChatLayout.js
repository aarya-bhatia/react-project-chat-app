import React from "react";
import MessageRecieved from "./MessageRecieved";
import MessageSent from "./MessageSent";
import MessageForm from "./MessageForm";

export default function ChatLayout({ contact_name, messages, sendMessage }) {
  return (
    <div className="col md-8 my-2">
      {/* chat header - name of contact  */}
      <h2>{contact_name}</h2>
      <hr />
      {/* chat body - messages */}
      <div className="chat-body h-50 p-4">
        {messages.map((message) => {
          if (message.author_name === contact_name) {
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
      </div>
      {/* chat footer - new message form */}
      <MessageForm sendMessage={(content) => sendMessage(content)} />
    </div>
  );
}
