import React from 'react';

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      {/* Main Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">Welcome to Chat App</h2>
          <p className="text-gray-500 text-lg">Please select a chat room to start messaging.</p>
        </div>
      </div>
    </div>
  );
}
