import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
          },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
})

export const { addMessage , setMessages} = chatSlice.actions;
export default chatSlice.reducer;