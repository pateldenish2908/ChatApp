// TypeScript interfaces
export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface Contact {
  _id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
  lastSeen: string;
}

export interface Message {
  text: string;
  time: string;
  senderId: string | number;
  read: boolean;
}

export interface Messages {
  [key: number]: Message[];
}

export interface SidebarHeaderProps {
  user: User;
  onMenuClick: () => void;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface ChatListItemProps {
  contact: Contact;
  isActive: boolean;
  onClick: (contact: Contact) => void;
  lastMessage: string;
  unreadCount: number;
}

export interface ChatListProps {
  contacts: Contact[];
  activeChat: Contact | null;
  onChatSelect: (contact: Contact) => void;
  searchTerm: string;
  messages: Messages;
}

export interface ChatHeaderProps {
  contact: Contact;
  onCall: (contact: Contact) => void;
  onVideoCall: (contact: Contact) => void;
  onInfo: (contact: Contact) => void;
}

export interface MessageProps {
  message: Message;
  isSent: boolean;
}

export interface MessagesContainerProps {
  messages: Message[];
  currentUserId: string;
}

export interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onAttach: () => void;
  onEmoji: () => void;
  onVoice: () => void;
}
