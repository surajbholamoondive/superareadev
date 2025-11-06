import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';


const useSocket = (userId, userData, activeChat, setMessages, setChats, setActiveChat, setProjects, setIsSearching, setShowProjects, userCurrentAddress) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isBotTypingMap, setIsBotTypingMap] = useState({});
  const [searchStatusMap, setSearchStatusMap] = useState({});

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_API}chatbot`);   

    newSocket.on('connect', () => {
      setConnected(true);

      newSocket.emit('get_chats', userId);
      if (activeChat) {
        newSocket.emit('join_chat', {activeChat: activeChat, userId: userId , userCurrentAddress: userCurrentAddress});
        newSocket.emit('get_chat', activeChat);
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setConnected(false);
    });

    newSocket.on('chat_history', (chatHistory) => {
      setChats(chatHistory || []);
    });

    newSocket.on('chat_data', (chat) => {
      
      if (chat && chat.messages) {
        if (Array.isArray(chat?.messages)) {
          setMessages(chat.messages);
        } else {
          setMessages([]);
        }
      }
    });

      newSocket.on('receive_message', (data) => {     
      const chatId = data.chatId;
      if(data.message.role == "user"){
         setIsBotTypingMap(prev => ({
        ...prev,
        [chatId]: true
        }));
      }
      else{
           setIsBotTypingMap(prev => ({
            ...prev,
            [chatId]: false
          }));
      }
      setMessages(prev => [...prev, data.message]);
    });

    newSocket.on('chat_created', (chat) => {
      setActiveChat(chat._id);
      setChats(prev => [chat, ...prev]);
      newSocket.emit('join_chat', {activeChat: chat._id,userId: userId, userCurrentAddress: userCurrentAddress});
    });

    newSocket.on('chat_deleted', (chatId) => {
      setChats(prev => prev.filter(chat => chat._id !== chatId));

      if (activeChat === chatId) {
        setActiveChat(null);
        setMessages([]);
      }
    });

    newSocket.on('chat_renamed', ({ chatId, newTitle }) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
    });

    newSocket.on('chat_title_updated', ({ chatId, newTitle }) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
    });

    newSocket.on('projects_found', (data) => {
      
      if (data.message && data.message.projects && data.message.projects.length > 0){
        setMessages(prev => [...prev, data.message]);
        setProjects(data.message.projects);
        setShowProjects(true);
      } else {
        setProjects([]);
        setShowProjects(false);
      }
      setIsBotTypingMap(prev => ({
    ...prev,
    [data.chatId]: false
  }));
    });

     newSocket.on('transcription_result', (data) => {
      console.log('Transcription completed:', data);
    });

    newSocket.on('transcription_error', (error) => {
      console.error('Transcription failed:', error);
    });
    newSocket.on('search_status', (data) => {
      setSearchStatusMap(prev => ({
        ...prev,
        [data.chatId]: {
          isSearching: true,
          message: data.message,
          timestamp: new Date()
        }
      }));
    });

    newSocket.on('search_complete', (data) => {
      setSearchStatusMap(prev => ({
        ...prev,
        [data.chatId]: {
          isSearching: false,
          message: '',
          timestamp: new Date()
        }
      }));
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message || 'An error occurred');
    });


    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      newSocket.off('search_status');
      newSocket.off('search_complete');
    };
  }, [userId, userCurrentAddress]);

  return { socket, connected ,isBotTypingMap, searchStatusMap };
};

export default useSocket;