import { createAction } from '@reduxjs/toolkit';
import { Message } from "../../types/Message";

export const addMessage = createAction<Message>('chat/addMessage');
export const clearMessages = createAction('chat/clearMessages');
export const updateMessageContent = createAction<{ id: number; content: string; isMarked?: boolean }>('chat/updateMessageContent');
