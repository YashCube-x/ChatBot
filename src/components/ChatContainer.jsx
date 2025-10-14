import React, { useEffect, useRef } from 'react'
import Message from './Message'

const ChatContainer = ({ messages, isLoading }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="chat-container">
      <div className="messages-wrapper">
        {messages.map((message) => (
          <Message 
            key={message.id} 
            text={message.text} 
            isUser={message.isUser} 
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <Message 
            text="Thinking..."
            isUser={false}
            isLoading={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default ChatContainer