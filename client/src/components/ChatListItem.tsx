import { ChatListItemProps } from "@/types/chat.interface";
import { Image } from "react-bootstrap";

// Chat List Item Component
const ChatListItem: React.FC<ChatListItemProps> = ({ contact, isActive, onClick, lastMessage, unreadCount }) => (
  <div
    className={`chat-list-item d-flex align-items-center ${isActive ? 'active' : ''}`}
    onClick={() => onClick(contact)}
  >
    <div className="position-relative me-3">
      <Image src={contact.avatar} alt={contact.name} className="avatar" />
      {contact.online && <div className="online-indicator"></div>}
    </div>
    <div className="flex-grow-1">
      <div className="d-flex justify-content-between align-items-start">
        <h6 className="mb-1 fw-semibold">{contact.name}</h6>
        <small className="text-muted">{contact.time}</small>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: '200px' }}>
          {lastMessage}
        </p>
        {unreadCount > 0 && (
          <span className="unread-count">{unreadCount}</span>
        )}
      </div>
    </div>
  </div>
);

export default ChatListItem;