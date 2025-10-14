import React, { useEffect, useRef } from 'react';

const ChatContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-end items-center bg-transparent px-8 py-8">
      <div className="w-full flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`max-w-[60%] px-6 py-4 rounded-2xl shadow-lg flex flex-col
              ${msg.isUser
                ? 'ml-auto bg-gradient-to-r from-[#8f94fb] to-[#6f6fc9] text-white'
                : 'mr-auto bg-white text-[#23235b]'
              }`}
          >
            <span className="text-base">{msg.text}</span>
            <span className="text-xs text-gray-400 mt-2">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto bg-gradient-to-r from-[#8f94fb] to-[#6f6fc9] text-white px-6 py-4 rounded-2xl shadow-lg animate-pulse max-w-[60%]">
            Typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;