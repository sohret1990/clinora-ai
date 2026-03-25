
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
