import React from "react";
import ChatLayout from "./ChatLayout";
import ChatList from "./ChatList";
import PhoneMenuOptions from "./PhoneMenuOptions";

export default function ChatView({
  user_id,
  chats,
  active,
  findContact,
  sendMessage,
}) {
  const current_chat = chats[active];
  const contact = findContact(current_chat, user_id);
  const contact_name = contact.name;
  return (
    <div className="row">
      <PhoneMenuOptions />
      <ChatList user_id={user_id} chats={chats} />
      <ChatLayout
        contact_name={contact_name}
        messages={current_chat.messages}
        sendMessage={(content) => sendMessage(content)}
      />
    </div>
  );
}
