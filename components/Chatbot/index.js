import React from "react";
import { useRouter,usePathname } from "next/navigation";  
import ChatBOtIcon from "../../assets/ChatBot.gif";
import styles from "./index.module.css";
import Image from 'next/image';

const ChatBot = () => {
  const router = useRouter();
  const pathname = usePathname();

   const handleClick = () => {
    router.push('/chatbot'); 
  };

  if(pathname === '/chatbot') {
    return null; 
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.chatbotLauncher} fixed bottom-4 right-4 z-50`}
    >
      <Image
        src={ChatBOtIcon}
        alt="ChatBot"
        width={100}
        height={100}
        priority
      />
    </button>
  );
};

export default ChatBot;
