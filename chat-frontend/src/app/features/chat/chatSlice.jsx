import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
})

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;