import { useState } from "react";
import { FiSend, FiSettings, FiSearch } from "react-icons/fi";

export default function App() {
  const users = [
    { id: 1, name: "Ethan", status: "Online", color: "bg-green-500" },
    { id: 2, name: "Olivia", status: "Away", color: "bg-yellow-500" },
    { id: 3, name: "Liam", status: "Busy", color: "bg-red-500" },
    { id: 4, name: "Sophia", status: "Online", color: "bg-green-500" },
    { id: 5, name: "Noah", status: "Online", color: "bg-green-500" },
  ];

  const messages = [
    { id: 1, sender: "Sophia", text: "Hey everyone! Excited to be here and chat with you all.", time: "10:30 AM", fromMe: false },
    { id: 2, sender: "Ethan", text: "Welcome, Sophia! Glad to have you. What are your interests?", time: "10:31 AM", fromMe: true },
    { id: 3, sender: "Sophia", text: "I'm into photography, hiking, and reading. How about you, Ethan?", time: "10:32 AM", fromMe: false },
  ];

  const [input, setInput] = useState("");

  return (
    <div className="h-screen flex text-white bg-[#111827]">
      <div className="w-64 bg-[#0f172a] flex flex-col">
        <div className="p-4 text-lg font-bold flex items-center gap-2">
          <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">C</div>
          ChatApp
        </div>

        <div className="px-4 text-sm text-gray-400">Online Users</div>
        <div className="flex-1 p-2 overflow-y-auto">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold">
                {user.name[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${user.color}`}></span>
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 flex items-center justify-between border-t border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
            <span className="text-sm">You</span>
          </div>
          <FiSettings className="text-gray-400" />
        </div>
      </div>

    
      <div className="flex-1 flex flex-col">
       
        <div className="border-b border-gray-700 p-4 flex justify-between items-center">
          <div>
            <h2 className="font-semibold">General Chat</h2>
            <p className="text-sm text-gray-400">Welcome to the General Chat room!</p>
          </div>
          <div className="flex gap-4 text-gray-400">
            <FiSearch />
            <FiSettings />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md p-3 rounded-lg ${msg.fromMe ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`}>
                <div className="text-xs text-gray-300 mb-1">
                  {msg.sender} • {msg.time}
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-gray-700 p-4 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 text-white p-2 rounded-lg outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <FiSend /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
