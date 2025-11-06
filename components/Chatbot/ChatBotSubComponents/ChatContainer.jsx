import React, { useEffect } from 'react';
import MessageList from './messages/MessageList';
import MessageForm from './messages/MessageForm';
import SearchResults from './SearchResults'; // Import the SearchResults component
import styles from '../index.module.css';
import { useState } from 'react';
import bgChatbot from '../../../assets/chatbot/bgChatbot.svg';
import Image from 'next/image';

function ChatContainer({
  isBotTypingMap,
  messages,
  setMessages,
  activeChat,
  socket,
  connected,
  userId,
  userCurrentAddress,
  setIsSearching,
  setShowProjects,
  searchStatusMap,
  isMobile,
  moreProperty,
  setMoreProperty,
  searchQuery,
  location 
}) {

  const [streamingMessages, setStreamingMessages] = useState({});
  const lastUserMessage = [...messages]
  .reverse()
  .find(message => message.role === 'user');

  useEffect(() => {
    if (!socket) return;

    const handleMessageUpdate = (data) => {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.timestamp === data.message.timestamp ? data.message : msg
        )
      );
    };

    const handleFileProcessingStarted = (data) => {
      console.log('File processing started:', data);
    };

    const handleFileProcessingResult = (data) => {
      console.log('File processing completed:', data);
    };

    const handleFileProcessingError = (data) => {
      console.error('File processing error:', data);
      alert(`File processing failed: ${data.message}`);
    };

    socket.on('message_updated', handleMessageUpdate);
    socket.on('file_processing_started', handleFileProcessingStarted);
    socket.on('file_processing_result', handleFileProcessingResult);
    socket.on('file_processing_error', handleFileProcessingError);
    socket.on('stream_chunk', (data) => {
      const { chatId, chunk } = data;
      setStreamingMessages(prev => prev + chunk);
    })

    return () => {
      socket.off('message_updated', handleMessageUpdate);
      socket.off('file_processing_started', handleFileProcessingStarted);
      socket.off('file_processing_result', handleFileProcessingResult);
      socket.off('file_processing_error', handleFileProcessingError);
    };
  }, [socket, setMessages]);


  // Check if moreProperty has items to determine what to show
  const shouldShowProjects = moreProperty && moreProperty.length > 0;

  return (
    <section className={` ${styles.chatContainerWrapper} relative h-full`}>
      <Image src={bgChatbot} className='pointer-events-none absolute h-[700px] -top-[250px] opacity-30 -right-[150px] ' />

      {shouldShowProjects ? (
        <SearchResults
          searchQuery={lastUserMessage?.content || ""}
          projects={moreProperty}
          moreProperty={moreProperty}
          setMoreProperty={setMoreProperty}
          showMoreProperty={true}

         
        />
      ) : (
        <>
          {messages.length > 0 && (
            <MessageList
              messages={messages}
              activeChat={activeChat}
              isBotTypingMap={isBotTypingMap}
              searchStatusMap={searchStatusMap}
              streamingMessages={streamingMessages}
              moreProperty={moreProperty}
              setMoreProperty={setMoreProperty}
          
            />
          )}
          <MessageForm
            socket={socket}
            connected={connected}
            userId={userId}
            activeChat={activeChat}
            setIsSearching={setIsSearching}
            setShowProjects={setShowProjects}
            messages={messages}
            userCurrentAddress={userCurrentAddress}
            setStreamingMessages={setStreamingMessages}
            isMobile={isMobile}
            isBotTypingMap={isBotTypingMap}
          />
        </>
      )}
    </section>
  );
}

export default ChatContainer;