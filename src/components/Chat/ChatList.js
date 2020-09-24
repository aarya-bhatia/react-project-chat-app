import React from "react";
import ChatListItem from "./ChatListItem";

export default function ChatList({ user_id, chats, current_chat_id }) {
  function createListItem(chat) {
    const contact_name = chat.users.find((user) => user._id !== user_id).name;

    let content = ""; // in case there are no messages

    if (chat.messages.length > 0) {
      content = chat.messages.slice(-1)[0].content; // slice() returns an array
    }

    // date user last opened chat
    const last_seen_at = chat.seenAt.find((entry) => entry.user_id === user_id)
      .time;

    // counting unread messages
    let count = 0;
    if (chat._id !== current_chat_id) {
      console.log("counting");
      for (let i = 0; i < chat.messages.length; i++) {
        // if message was sent after user left the chat, then mark it as unread
        if (chat.messages[i].date > last_seen_at) {
          count++;
        }
      }
    }

    return (
      <ChatListItem
        name={contact_name}
        content={content}
        count={count}
        key={chat._id}
      />
    );
  }

  return (
    <div className="col-md-4 d-none d-md-block">
      <div className="list-group list-group-flush">
        {chats.map((chat) => createListItem(chat))}
      </div>
    </div>
  );
}
