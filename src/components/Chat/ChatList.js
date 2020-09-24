import React from "react";
import ChatListItem from "./ChatListItem";

export default function ChatList({ user_id, chats }) {
  function createListItem(chat) {
    const contact_name = chat.users.filter((user) => user._id !== user_id)[0]
      .name;
    // filter()[0] returns the first object in array

    let content = "";

    if (chat.messages.length > 0) {
      content = chat.messages.slice(-1)[0].content; // slice() returns an array
    }

    const count = chat.messages.reduce((count, message) => {
      if (message.seenBy.length === 0) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

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
