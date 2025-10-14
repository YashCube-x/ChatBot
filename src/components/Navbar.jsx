import React, { useState } from 'react';

const Navbar = ({ startNewChat, chatHistory, loadChat, activeChatId, onClearAllChats }) => {
  const [search, setSearch] = useState('');

  const filteredChats = chatHistory.filter(chat =>
    chat.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 h-full bg-[#181028] text-white flex flex-col py-4 px-3 border-r border-[#23235b]">
      {/* Logo and New Chat */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#8f94fb"/><text x="6" y="17" fontSize="10" fill="white">YB</text></svg>
        </span>
        <span className="font-bold text-lg">YashBot</span>
      </div>
      <button
        onClick={startNewChat}
        className="flex items-center gap-2 bg-[#23235b] hover:bg-[#8f94fb] text-white px-4 py-2 rounded-lg mb-4 font-semibold transition-colors"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        New chat
      </button>
      <button
        onClick={onClearAllChats}
        className="flex items-center gap-2 bg-[#8f94fb] hover:bg-[#23235b] text-white px-4 py-2 rounded-lg mb-4 font-semibold transition-colors"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
        Clear All Chats
      </button>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-3 py-2 rounded bg-[#23235b] text-white placeholder:text-[#8f94fb] focus:outline-none"
          placeholder="Search chats"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-xs text-[#8f94fb] mb-2">Chats</div>
        {filteredChats.length === 0 && (
          <div className="text-[#8f94fb]/60 text-center text-xs">No chats</div>
        )}
        <ul className="space-y-1">
          {filteredChats.map(chat => (
            <li key={chat.id}>
              <button
                onClick={() => loadChat(chat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg
                  ${activeChatId === chat.id
                    ? 'bg-[#8f94fb] text-white font-semibold'
                    : 'bg-[#23235b] text-white hover:bg-[#8f94fb]'
                  } transition-colors`}
                title={chat.title || `Chat ${new Date(chat.id).toLocaleString()}`}
              >
                {chat.title || new Date(chat.id).toLocaleString()}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
