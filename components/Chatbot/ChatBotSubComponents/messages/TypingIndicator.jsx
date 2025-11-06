import React from 'react';
import Image from "next/image";
import logoIcon from '@/assets/logo-icon.svg';

export default function TypingIndicator({ loadingMessage = "" }) {
  return (
    <div className="flex mb-4 items-start">

      <div className="w-30 h-30 flex items-center justify-center rounded-full mx-2  text-[1.2rem]">

        <Image
          src={logoIcon.src}
          alt="Assistant"
          width={40}
          height={40}
          className="w-30 h-30 object-contain"
        />
      </div>
      <div className="max-w-[70%] px-4 py-2 rounded-[18px] max-md:text-[14px] max-md:px-2 relative bg-[#f1f3f5] text-[#343a40] rounded-bl-[4px]">
        <div className="flex space-x-1 h-5 items-center">
          {loadingMessage && <div className='mr-1'>{loadingMessage} </div>}
          
          <span
            className="w-1.5 h-1.5 bg-[#6c757d] rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="w-1.5 h-1.5 bg-[#6c757d] rounded-full animate-bounce"
            style={{ animationDelay: '0.15s' }}
          />
          <span
            className="w-1.5 h-1.5 bg-[#6c757d] rounded-full animate-bounce"
            style={{ animationDelay: '0.3s' }}
          />
          
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-3px); 
            }
          }
          .animate-bounce {
            animation: bounce 1s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
