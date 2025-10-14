import React from 'react'

const Message = ({ text, isUser, timestamp, isLoading = false }) => {
  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        {isLoading ? (
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <p className="message-text">{text}</p>
        )}
        <span className="message-time">
          {timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}

export default Message