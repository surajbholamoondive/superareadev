import React from 'react';
import ChatList from './chats/ChatList';
import styles from '../index.module.css';

function Sidebar({ socket, connected, chats, activeChat, handleNewChat, handleSelectChat, handleDeleteChat, setMessages, setActiveChat, isMobile}) {
  return (
    <div className={`${styles.sidebarWrapper}`}>
      <button
        className={styles.newChatButton}
        onClick={handleNewChat}
        disabled={!connected}
      >
        + New Chat
      </button>

      <ChatList
        socket={socket}
        chats={chats}
        setActiveChat={setActiveChat}
        activeChat={activeChat}
        handleSelectChat={handleSelectChat}
        handleDeleteChat={handleDeleteChat}
        setMessages={setMessages}
      />
    </div>
  );
}

export default Sidebar;
