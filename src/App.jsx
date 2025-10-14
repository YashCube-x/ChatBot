import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ChatContainer from './components/ChatContainer';
import InputBox from './components/InputBox';
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  // Start a new chat
  const startNewChat = () => {
    const chatNumber = chatHistory.length + 1;
    const newChat = {
      id: Date.now(),
      title: `Chat ${chatNumber}`,
      messages: [
        {
          id: 1,
          text: "Hi! I'm YashBot 🤖 — powered by Gemini AI. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]
    };
    setChatHistory(prev => [...prev, newChat]);
    setActiveChatId(newChat.id);
    setMessages(newChat.messages);
  };

  // Load chat by id
  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setActiveChatId(chatId);
      setMessages(chat.messages);
    }
  };

  // Add message to current chat
  const addMessage = (text, isUser = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => {
      const updated = [...prev, newMessage];
      setChatHistory(history =>
        history.map(chat =>
          chat.id === activeChatId
            ? { ...chat, messages: updated }
            : chat
        )
      );
      return updated;
    });
  };

  // Send message
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    addMessage(message, true);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        config: {
          systemInstruction: "You are YashBot — a helpful, friendly AI assistant. Keep responses short and engaging.",
          temperature: 0.7,
        },
      });

      const botResponse = response.text || "Sorry, I couldn't generate a response.";
      addMessage(botResponse, false);

    } catch (error) {
      console.error("Gemini API Error:", error);
      addMessage("❌ Sorry, something went wrong while connecting to Gemini API.", false);
    } finally {
      setIsLoading(false);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setChatHistory(savedHistory);
    if (savedHistory.length > 0) {
      setActiveChatId(savedHistory[savedHistory.length - 1].id);
      setMessages(savedHistory[savedHistory.length - 1].messages);
    }
  }, []);

  // Save to localStorage when chatHistory changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const clearAllChats = () => {
    setChatHistory([]);
    setActiveChatId(null);
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#8f94fb] via-[#a6b1ff] to-[#6f6fc9]">
      <Navbar
        startNewChat={startNewChat}
        chatHistory={chatHistory}
        loadChat={loadChat}
        activeChatId={activeChatId}
        onClearAllChats={clearAllChats}
      />
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="w-full max-w-4xl flex flex-col flex-1 justify-between">
          <ChatContainer messages={messages} isLoading={isLoading} />
          <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
