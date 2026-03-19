import { createReducer } from '@reduxjs/toolkit';
import { addMessage, clearMessages, updateMessageContent } from '../actions/chatActions';
import { fetchMessages } from '../actions/chatAsyncActions';
import { ChatState } from '../../types/chatTypes';

const initialState: ChatState = {
  messages: [],
};

const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMessage, (state, action) => {
      state.messages.push(action.payload);
    })
    .addCase(clearMessages, (state) => {
      state.messages = [];
    })
    .addCase(updateMessageContent, (state, action) => {
      const { id, content, isMarked } = action.payload;
      const msg = state.messages.find((m) => m.id === id);
      if (msg) {
        msg.content = content;
        if (typeof isMarked !== 'undefined') msg.isMarked = isMarked;
      }
    })
    .addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
});

export default chatReducer;
