import { useEffect, useRef } from "react";
import Message from "./Message";
import { MessagesContainerProps } from "@/types/chat.interface";

// Messages Container Component
const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          isSent={message.senderId === currentUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesContainer;