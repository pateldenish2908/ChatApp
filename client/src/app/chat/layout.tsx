import React from 'react';
import ChatList from '../components/ChatList';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ChatList />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
