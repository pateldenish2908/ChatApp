"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { socket } from "@/utils/socket";
import { Message, User } from "@/types";
import { useGetMessagesByRoomIdQuery } from "@/lib/services/chatApiSlice";

interface Props {
  roomId: string;
  user: User;
}

export default function ChatWindow({ roomId, user }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: fetchedMessages = [], isLoading } =
    useGetMessagesByRoomIdQuery(roomId);

  // Set fetched messages once
  useEffect(() => {
    if (fetchedMessages.length === 0) return;
    setMessages(fetchedMessages);
  }, [fetchedMessages]);

  // Socket setup
  useEffect(() => {
    socket.emit("join", { roomId });

    const onReceive = (msg: Message) => {
      if (msg.chatRoom === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", onReceive);

    return () => {
      socket.emit("leave", { roomId });
      socket.off("receiveMessage", onReceive);
    };
  }, [roomId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const content = input.trim();
    if (!content) return;

    socket.emit("sendMessage", {
      chatRoom: roomId,
      senderId: user._id,
      content,
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white font-semibold text-lg shadow flex justify-between items-center">
        <div>
          Chat Room: <span className="text-sm font-normal">{roomId}</span>
        </div>
        <Link href="/chat">
          <span
            className="text-white hover:text-blue-200 text-xl cursor-pointer"
            title="Close"
          >
            ✖
          </span>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-lg font-semibold">No messages yet</div>
              <div className="text-sm">Start the conversation 👋</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => {
              const isOwn = msg.sender?._id === user._id;
              return (
                <div
                  key={index}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${
                      isOwn
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <div>{msg?.message}</div>
                    <div className="text-xs text-gray-300 mt-1 text-right">
                      {msg.createdAt &&
                        new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
