import React from "react";
import MessageForm from "./MessageForm";
import MessagesContainer from "./MessagesContainer";

export default function ChatLayout({
  user_id,
  contact_name,
  messages,
  sendMessage,
  api,
  chat_id,
}) {
  return (
    <div className="col md-8 my-2">
      {/* chat header - name of contact  */}
      <h2>{contact_name}</h2>
      <hr />
      {/* chat body - messages */}
      <MessagesContainer
        messages={messages}
        contact_name={contact_name}
        user_id={user_id}
        api={api}
        chat_id={chat_id}
      />
      {/* chat footer - new message form */}
      <MessageForm sendMessage={(content) => sendMessage(content)} />
    </div>
  );
}
