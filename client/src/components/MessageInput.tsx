import { MessageInputProps } from "@/types/chat.interface";
import { Button, Form } from "react-bootstrap";

// Message Input Component
const MessageInput: React.FC<MessageInputProps> = ({ message, onMessageChange, onSendMessage, onAttach, onEmoji, onVoice }) => (
  <div className="message-input-area">
    <div className="d-flex align-items-center">
      <Button variant="link" className="text-secondary p-2" onClick={onEmoji}>
        <i className="fas fa-smile"></i>
      </Button>
      <Button variant="link" className="text-secondary p-2" onClick={onAttach}>
        <i className="fas fa-paperclip"></i>
      </Button>
      <div className="flex-grow-1 mx-2">
        <Form.Control
          type="text"
          className="border-0"
          placeholder="Type a message"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          style={{ borderRadius: '25px', padding: '10px 20px' }}
        />
      </div>
      {message.trim() ? (
        <Button variant="primary" className="rounded-circle p-2" onClick={onSendMessage}>
          <i className="fas fa-paper-plane"></i>
        </Button>
      ) : (
        <Button variant="link" className="text-secondary p-2" onClick={onVoice}>
          <i className="fas fa-microphone"></i>
        </Button>
      )}
    </div>
  </div>
);

export default MessageInput;
