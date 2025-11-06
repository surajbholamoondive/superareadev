import React, { useRef, useEffect } from 'react';
import Message from './Messages';
import TypingIndicator from './TypingIndicator';
import CustomMarkdownMessage from './UserMessage';
import Image from 'next/image';
import logoIcon from '@/assets/logo-icon.svg';


function MessageList({ messages, activeChat, isBotTypingMap, searchStatusMap, streamingMessages, moreProperty, setMoreProperty , query, setQuery}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 p-5 max-md:p-0 overflow-y-auto h-full flex flex-col w-[90%] max-md:w-full space-y-4 `}>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <Message
            key={`${msg.timestamp}-${index}`}
            message={msg}
            isBotTypingMap={isBotTypingMap}
            streamingMessages={streamingMessages}
            moreProperty={moreProperty}
            setMoreProperty={setMoreProperty}
            query={query}
            setQuery={setQuery}
          />
        ))
      ) : (
        <div className="flex-1 flex items-center justify-center text-[#6c757d] text-[1.1rem]">
          {activeChat && 'Loading messages...'}
        </div>
      )}

      {activeChat && isBotTypingMap[activeChat] && (
        <>
          {!streamingMessages && <TypingIndicator loadingMessage={searchStatusMap[activeChat]?.message} />}
          {streamingMessages && (
            <div>
              <div
                className={` flex  rounded-full mx-2 text-[1.2rem] bg-red 
                  `}
              >

                <Image
                  src={logoIcon.src}
                  alt="User"
                  width={30}
                  height={30}
                  className="z-[1000px] h-[50px] w-[50px] object-contain"
                />

                {streamingMessages &&
                  <div className='max-w-[82%] px-4 py-3 rounded-[18px] relative whitespace-pre-wrap break-words leading-[1.5] bg-[#f1f3f5] text-[#343a40] rounded-bl-[4px]'>
                    <CustomMarkdownMessage
                      content={streamingMessages.toString()}
                      isBotTypingMap={isBotTypingMap}
                    />
                  </div>}
              </div>

            </div>
          )}

        </>
      )}


      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;
