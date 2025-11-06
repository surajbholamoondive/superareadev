import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import useSocket from '../hooks/useSocket';
import styles from '../index.module.css';
import { useAuth } from '@/context/auth'
import BackgroundImage from './../../../assets/NonLoggedUserImages/backgroundImage.svg'
import { Menu, ArrowLeft  } from 'lucide-react';

const ChatBotUI = () => {
  const [auth] = useAuth()
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [userData, setUserData] = useState({});
  const userIdAuth = auth?.userResult?._id; 
  const [userCurrentAddress, setUserCurrentAddress] = useState("");
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [moreProperty, setMoreProperty] = useState([]);

  const fetchCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_apiGooglePlace}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      
      const cityComponent = data.results[0]?.address_components.find(
        (component) => component.types.includes("locality")
      )?.long_name;
      const sublocalityComponent = data.results[0]?.address_components.find((component) =>
        component.types.includes("sublocality") || component.types.includes("sublocality_level_1")
      )?.long_name;

      const currentAddress = sublocalityComponent + "," + cityComponent;
      setUserCurrentAddress(currentAddress);

    } catch (error) {
      console.log(error);
    }
  };

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  useEffect(() => {
    fetchCurrentLocation();
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (userIdAuth) {
      setUserId(userIdAuth);
    } else {
      const newUserId = `user_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }
  }, [userIdAuth]);

  const { socket, connected, isBotTypingMap, searchStatusMap } = useSocket(
    userId,
    userData,
    activeChat,
    setMessages,
    setChats,
    setActiveChat,
    setProjects,
    setIsSearching,
    setShowProjects,
    userCurrentAddress,
  );

  const handleNewChat = () => {
    setActiveChat(null);
    setMoreProperty([]);
    setMessages([]);
    setShowProjects(false);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleSelectChat = (chatId) => {
    if (!socket || !connected) return;

    setMoreProperty([])
    setActiveChat(chatId);
    socket.emit('join_chat', {activeChat: chatId, userId: userId, userCurrentAddress: userCurrentAddress});
    socket.emit('get_chat', chatId);
    setShowProjects(false);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteChat = (chatId) => {
    if (!socket || !connected) return;
    socket.emit('delete_chat', chatId);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

return (
  <div className="bg-primary w-full fixed h-[calc(100dvh-5rem)] top-[5rem] md:h-[calc(100dvh-3.5rem)] md:top-[3.5rem] pt-4 pb-3" style={{
    backgroundImage: `url(${BackgroundImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  }}>
    <div className="custom-section w-[95%] md:w-[93%] !p-0 h-full">
      <div className={`rounded-lg h-full overflow-hidden ${styles.chatboxContainer} flex flex-col rounded-xl relative`}>
        
        {userIdAuth && isMobile && (
          <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between z-50 flex-shrink-0">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md"
            >
         {isSidebarOpen? <ArrowLeft />:<Menu />}
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Chat</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        )}

        <main className={`flex flex-1 overflow-hidden relative ${userIdAuth ? '' : ''}`}>
          {userIdAuth && (
            <>
              <div className="hidden lg:block">
                <Sidebar
                  socket={socket}
                  connected={connected}
                  chats={chats}
                  activeChat={activeChat}
                  handleNewChat={handleNewChat}
                  handleSelectChat={handleSelectChat}
                  handleDeleteChat={handleDeleteChat}
                  setMessages={setMessages}
                  setActiveChat={setActiveChat}
                />
              </div>

              {isMobile && (
                <>
                  {isSidebarOpen && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 z-50 md:hidden"
                      onClick={() => setIsSidebarOpen(false)}
                    />
                  )}
                  
                  <div className={`
                    abosolute top-0 left-0 h-full bg-white  z-50 transform transition-transform duration-500 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full hidden'}
                  `}>
                   
                    <div className="h-full  absolute z-50 overflow-hidden">
                      <Sidebar
                        socket={socket}
                        connected={connected}
                        chats={chats}
                        activeChat={activeChat}
                        handleNewChat={handleNewChat}
                        handleSelectChat={handleSelectChat}
                        handleDeleteChat={handleDeleteChat}
                        setMessages={setMessages}
                        setActiveChat={setActiveChat}
                        isMobile={true}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className={`flex-1 ${userIdAuth ? (isMobile ? 'w-full' : '') : 'w-full'}`}>
            <ChatContainer
              isBotTypingMap={isBotTypingMap}
              searchStatusMap={searchStatusMap}
              messages={messages}
              activeChat={activeChat}
              socket={socket}
              connected={connected}
              userId={userId}
              showProjects={showProjects}
              projects={projects}
              isSearching={isSearching}
              userCurrentAddress={userCurrentAddress}
              setMessages={setMessages}
              setIsSearching={setIsSearching}
              setShowProjects={setShowProjects}
              toggleSidebar={toggleSidebar}
              isMobile={isMobile}
              moreProperty={moreProperty}
              setMoreProperty={setMoreProperty}
            />
          </div>
        </main>
      </div>
    </div>
  </div>
);
};

export default ChatBotUI;