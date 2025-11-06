import React, { useState, useRef, useEffect } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import styles from "../../index.module.css";

function ChatItem({ socket, chat,setActiveChat, isActive, onSelect, onDelete, setMessages }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title || "New Chat");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  setTitle(chat.title || "New Chat");
}, [chat.title]);

  const confirmDelete = () => {
    onDelete(chat._id);
    setMessages([]);
    setActiveChat(null);
    setShowDeleteModal(false);
  };

  const startRename = () => {
    setIsEditing(true);
  };

  const handleRenameBlur = async () => {
    setIsEditing(false);
    if (title.trim() === chat.title) return;

    socket.emit("rename_chat", {
      chatId: chat._id,
      newTitle: title.trim(),
    });

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.target.blur();
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div
        className={`${styles.chatItem} ${isActive ? styles.chatItemActive : ""} group flex justify-between items-center w-full`}
        onClick={() => onSelect(chat._id)}
      >
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleRenameBlur}
              onKeyDown={handleKeyDown}
              className={`${styles.chatTitle} w-full px-1 py-0.5`}
              autoFocus
            />
          ) : (
            <div
              title={title}
              className={`${styles.chatTitle} ${
                isActive ? styles.chatTitleActive : styles.chatTitleInactive
              } truncate`}
            >
              {title}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 ml-2 text-xs text-gray-500 relative flex items-center space-x-2">
          <div className="hidden group-hover:flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                startRename();
              }}
              title="Rename"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 6.04a1.003 1.003 0 0 0 0-1.42L18.37 2.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              title="Delete"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 3v1H4v2h1v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5V3H9zm8 4v14H7V7h10zM9 9h2v10H9zm4 0h2v10h-2z" />
              </svg>
            </button>
          </div>
          
          <span className={`group-hover:hidden ${isActive ? "text-white":""}`}>
            {formatDate(chat.updatedAt)}
          </span>
        </div>
      </div>

      <ConfirmDeleteModal
        open={showDeleteModal}
        message="Do you want to delete this chat?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default ChatItem;
