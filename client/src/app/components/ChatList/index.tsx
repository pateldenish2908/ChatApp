"use client";

import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { useGetChatRoomsQuery } from "@/lib/services/chatApiSlice";
import { ChatRoom } from "@/types";

const user = getCurrentUser();

export default function ChatList() {
  const { data: rooms, isLoading } = useGetChatRoomsQuery(user?._id);

  return (
    <div className="w-full md:w-80 border-r p-4 bg-white shadow h-full flex flex-col">
      <Link className="text-2xl font-bold mb-6 text-blue-600" href="/chat">
        Chat Rooms
      </Link>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Loading...
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-center">
          <div>
            <p className="text-lg font-medium mb-2">No chat rooms available</p>
            <p className="text-sm">Start a conversation to see it here.</p>
          </div>
        </div>
      ) : (
        <ul className="space-y-3 flex-1 overflow-y-auto mb-4">
          {rooms.map((room: ChatRoom) => (
            <li key={room?._id}>
              <Link href={`/chat/${room._id}`}>
                <div className="p-4 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 transition rounded-lg cursor-pointer shadow-sm">
                  <div className="font-semibold truncate text-gray-600">
                    {room.participants[0]?.name}
                  </div>
                  <div className="truncate text-sm text-gray-600">
                    {new Date(room.createdAt).toLocaleString()}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Explore Button */}
      <Link
        href="/explore"
        className="mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition font-medium"
      >
        + Explore Users
      </Link>
    </div>
  );
}
