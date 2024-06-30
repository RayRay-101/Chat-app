import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        selectedContact: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        clearUser: (state) => {
            state.currentUser = null;
        },
        selectContact: (state, action) => {
            state.selectedContact = action.payload;
        }
    }
})

export const { setUser, clearUser, selectContact } = userSlice.actions;
export default userSlice.reducer;