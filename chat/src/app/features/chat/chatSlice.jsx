import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setMessage: (state, action) => {
            state.messages = action.payload
        },
    },
})

export const { addMessage, setMessage } = chatSlice.actions;
export default chatSlice.reducer;