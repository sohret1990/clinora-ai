export interface MessageImage {
  name: string;
  url: string;
  mimeType: string;
}

export interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
  time: string;
  isMarked: boolean;
  image?: MessageImage;
}

export interface UserProfile {
  name: string;
  identifier: string;
  identifierType: 'email' | 'phone';
}

export interface StoredAccount extends UserProfile {
  password: string;
}

export interface HistoryItem {
  id: number;
  label: string;
}

export interface PersistedChatState {
  messages: Message[];
  model: string;
}

export interface AuthPayload {
  mode: 'login' | 'register' | 'reset';
  name: string;
  identifier: string;
  password: string;
}
