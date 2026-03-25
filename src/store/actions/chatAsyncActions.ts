import { createAsyncThunk } from '@reduxjs/toolkit';
import { Message } from "../../types/Message";

export const fetchMessages = createAsyncThunk<Message[], void>(
  'chat/fetchMessages',
  async () => {
    return new Promise<Message[]>((resolve) => {
      setTimeout(() => {
        resolve([
          // { id: 1, role: 'ai', content: 'Async mesaj 1', time: '12:00', isMarked: false },
          // { id: 2, role: 'user', content: 'Async mesaj 2', time: '12:01', isMarked: false },
        ]);
      }, 1000);
    });
  }
);
