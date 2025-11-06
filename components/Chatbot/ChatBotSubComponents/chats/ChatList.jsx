import React from 'react';
import ChatItem from './ChatItem';
import styles from '../../index.module.css';

function ChatList({ socket, chats,setActiveChat, activeChat, handleSelectChat, handleDeleteChat, setMessages, moreProperty, setMoreProperty }) {
  return (
    <div className={styles.chatListWrapper}>
      {chats.length > 0 ? (
        chats.map(chat => (
          <ChatItem
            key={chat._id}
            socket={socket}
            chat={chat}
            setActiveChat={setActiveChat}
            isActive={activeChat === chat._id}
            onSelect={handleSelectChat}
            onDelete={handleDeleteChat}
            setMessages={setMessages}
          />
        ))
      ) : (
        <div className={styles.emptyState}>No chat history yet</div>
      )}
    </div>
  );
}

export default ChatList;