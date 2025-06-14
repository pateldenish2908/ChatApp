import { ChatListProps } from "@/types/chat.interface";
import ChatListItem from "./ChatListItem";

// Chat List Component
const ChatList: React.FC<ChatListProps> = ({
  contacts,
  activeChat,
  onChatSelect,
  searchTerm,
  messages,
}) => {
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      {filteredContacts.map((contact) => {
        const chatMessages = messages[contact._id] || [];
        const lastMessage =
          chatMessages.length > 0
            ? chatMessages[chatMessages.length - 1].text
            : contact.lastMessage;
        const unreadCount = chatMessages.filter(
          (msg) => !msg.read && msg.senderId !== "current-user"
        ).length;

        return (
          <ChatListItem
            key={contact._id}
            contact={contact}
            isActive={activeChat?._id === contact._id}
            onClick={onChatSelect}
            lastMessage={lastMessage}
            unreadCount={unreadCount}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
