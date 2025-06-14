import { ChatHeaderProps } from "@/types/chat.interface";
import { Button, Image } from "react-bootstrap";

// Chat Header Component
const ChatHeader: React.FC<ChatHeaderProps> = ({ contact, onCall, onVideoCall, onInfo }) => (
  <div className="chat-header d-flex justify-content-between align-items-center">
    <div className="d-flex align-items-center">
      <div className="position-relative me-3">
        <Image src={contact.avatar} alt={contact.name} className="avatar" />
        {contact.online && <div className="online-indicator"></div>}
      </div>
      <div>
        <h6 className="mb-0">{contact.name}</h6>
        <small className="opacity-75">
          {contact.online ? 'Online' : `Last seen ${contact.lastSeen}`}
        </small>
      </div>
    </div>
    <div>
      <Button variant="link" className="text-white p-2" onClick={() => onCall(contact)}>
        <i className="fas fa-phone"></i>
      </Button>
      <Button variant="link" className="text-white p-2" onClick={() => onVideoCall(contact)}>
        <i className="fas fa-video"></i>
      </Button>
      <Button variant="link" className="text-white p-2" onClick={() => onInfo(contact)}>
        <i className="fas fa-ellipsis-v"></i>
      </Button>
    </div>
  </div>
);

export default ChatHeader;