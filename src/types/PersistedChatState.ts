import { Message } from "./Message";


export interface PersistedChatState {
  messages: Message[];
  model: string;
}
