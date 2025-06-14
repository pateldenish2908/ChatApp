import { MessageProps } from "@/types/chat.interface";

// Message Component
const Message: React.FC<MessageProps> = ({ message, isSent }) => (
  <div className={`message d-flex ${isSent ? 'sent justify-content-end' : 'received'}`}>
    <div className="message-bubble">
      <div className="message-text">{message.text}</div>
      <div className="message-time d-flex justify-content-end align-items-center">
        <small>{message.time}</small>
        {isSent && (
          <i className={`fas ${message.read ? 'fa-check-double text-primary' : 'fa-check'} ms-1`} style={{ fontSize: '10px' }}></i>
        )}
      </div>
    </div>
  </div>
);
export default Message;