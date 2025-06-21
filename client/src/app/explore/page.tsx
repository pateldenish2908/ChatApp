"use client";

import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/getCurrentUser";
import Image from "next/image";
import { useCreateOrGetChatRoomMutation } from "@/lib/services/chatApiSlice";
import { useGetNearbyUsersQuery } from "@/lib/services/userApiSlice";
import Loader from "../components/Loader";

const NearbyUsers = () => {
  const router = useRouter();
  const user = getCurrentUser();
  const currentUserId = user?._id;

  const latitude = 19.076;
  const longitude = 72.8777;

  const { data: users = [], isLoading } = useGetNearbyUsersQuery({
    latitude,
    longitude,
    userId: currentUserId,
  });

  const [createOrGetChatRoom, {isLoading:createOrGetChatRoomLoading}] = useCreateOrGetChatRoomMutation();

  const handleCreateChatRoom = async (otherUserId: string) => {
    try {
      const room = await createOrGetChatRoom({
        userId1: currentUserId,
        userId2: otherUserId,
      }).unwrap();
      router.push(`/chat/${room._id}`);
    } catch (error) {
      console.error("Failed to create or get chat room", error);
    }
  };

  const goToChatList = () => {
    router.push("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      {/* Header with button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Nearby Users</h1>
        <button
          onClick={goToChatList}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Go to Chat List
        </button>
      </div>
      {(isLoading || createOrGetChatRoomLoading) ? (
        <Loader text="Loading nearby users..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map(
            (user: {
              _id: string;
              name: string;
              avatar: string;
              distance: number;
            }) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    className="object-cover"
                    fill
                    sizes="128px"
                    priority
                  />
                </div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500 mb-4">
                  {user.distance?.toFixed(2)} km away
                </p>

                <button
                  onClick={() => handleCreateChatRoom(user._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Chat
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default NearbyUsers;
