"use client";

import ChatHeader from "@/components/ChatHeader";
import ChatList from "@/components/ChatList";
import MessageInput from "@/components/MessageInput";
import MessagesContainer from "@/components/MessagesContainer";
import SearchBar from "@/components/SearchBar";
import SidebarHeader from "@/components/SidebarHeader";
import WelcomeScreen from "@/components/WelcomeScreen";
import { Contact, Message, User } from "@/types/chat.interface";

type Messages = {
  [contactId: string]: Message[];
};
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import io, { Socket } from "socket.io-client";

// Socket.IO connection
let socket: Socket | null = null;
// Main App Component
export default function WhatsAppClone() {
  const [selectedChat, setSelectedChat] = useState<Contact | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Messages>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  const currentUser: User = {
    _id: "current-user",
    name: "You",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
  };

  // Initialize Socket.IO and fetch initial data
  useEffect(() => {
    // Connect to Socket.IO
    socket = io("http://localhost:4000", {
      withCredentials: true,
      transports: ["websocket"], // optional: forces WebSocket only
    });
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Fetch contacts
    fetch("http://localhost:4000/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error fetching contacts:", err));

    // Socket.IO event listeners
    socket.on("message", (newMessage: Message) => {
      setMessages((prev) => ({
        ...prev,
        [newMessage.senderId === "current-user"
          ? selectedChat?._id || 0
          : newMessage.senderId]: [
          ...(prev[
            newMessage.senderId === "current-user"
              ? String(selectedChat?._id ?? "")
              : String(newMessage.senderId)
          ] || []),
          newMessage,
        ],
      }));
    });

    socket.on("contactUpdate", (updatedContact: Contact) => {
      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        )
      );
    });

    socket.on("messagesRead", (updatedMessages: Message[]) => {
      if (selectedChat) {
        setMessages((prev) => ({
          ...prev,
          [selectedChat._id]: updatedMessages,
        }));
      }
    });

    return () => {
      socket?.disconnect();
    };
  }, [selectedChat]);

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      fetch(`http://localhost:4000/api/messages/${selectedChat._id}`)
        .then((res) => res.json())
        .then((data) => {
          setMessages((prev) => ({
            ...prev,
            [selectedChat._id]: data,
          }));
          // Join chat room and mark messages as read
          socket?.emit("join", { contactId: selectedChat._id });
          socket?.emit("markAsRead", { contactId: selectedChat._id });
        })
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat || !socket) return;

    const newMessage: Message = {
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderId: "current-user",
      read: true,
    };

    socket.emit("message", {
      contactId: selectedChat._id,
      text: newMessage.text,
      senderId: "current-user",
    });
    setMessage("");
  };

  const handleChatSelect = (contact: Contact) => {
    setSelectedChat(contact);
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0 chat-container">
        <Col md={4} lg={3} className="sidebar">
          <SidebarHeader
            user={currentUser}
            onMenuClick={() => console.log("Menu clicked")}
          />
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <ChatList
            contacts={contacts}
            activeChat={selectedChat}
            onChatSelect={handleChatSelect}
            searchTerm={searchTerm}
            messages={messages}
          />
        </Col>
        <Col md={8} lg={9}>
          {selectedChat ? (
            <div className="chat-area">
              <ChatHeader
                contact={selectedChat}
                onCall={(contact) => console.log("Calling", contact.name)}
                onVideoCall={(contact) =>
                  console.log("Video calling", contact.name)
                }
                onInfo={(contact) => console.log("Info for", contact.name)}
              />
              <MessagesContainer
                messages={messages[selectedChat._id] || []}
                currentUserId="current-user"
              />
              <MessageInput
                message={message}
                onMessageChange={setMessage}
                onSendMessage={handleSendMessage}
                onAttach={() => console.log("Attach file")}
                onEmoji={() => console.log("Open emoji picker")}
                onVoice={() => console.log("Record voice message")}
              />
            </div>
          ) : (
            <WelcomeScreen />
          )}
        </Col>
      </Row>
    </Container>
  );
}
