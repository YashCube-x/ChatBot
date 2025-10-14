import React, { useState } from 'react';

const InputBox = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="bg-white rounded-2xl shadow-lg m-6 p-4 flex items-center gap-4"
    >
      <input
        type="text"
        className="flex-1 px-4 py-3 rounded-xl border border-[#8f94fb] focus:outline-none focus:ring-2 focus:ring-[#8f94fb] text-[#23235b] bg-white text-base"
        placeholder="Type your message here..."
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-[#8f94fb] to-[#6f6fc9] text-white font-semibold px-6 py-3 rounded-xl shadow hover:from-[#6f6fc9] hover:to-[#8f94fb] transition-colors duration-200 disabled:opacity-60"
        disabled={isLoading || !input.trim()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
};

export default InputBox;