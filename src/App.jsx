import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ChatContainer from './components/ChatContainer';
import InputBox from './components/InputBox';
import { GoogleGenAI } from "@google/genai"; // ✅ Gemini SDK

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm YashBot 🤖 — powered by Gemini AI. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY, // ✅ Securely load API key
  });

  const addMessage = (text, isUser = false) => {
    const newMessage = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    addMessage(message, true);
    setIsLoading(true);

    try {
      // ✅ Gemini API call
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

  return (
    <div className="app">
      <Navbar />
      <div className="chat-app">
        <ChatContainer messages={messages} isLoading={isLoading} />
        <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
