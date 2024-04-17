import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedContact: null,
    contacts: [],// Array of contact objects
}

export const ContactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        selectedContact: (state, action) => {
            state.selectedContact = action.payload
        }
        //other reducer functions for managing contacts go here
    }
})

export const { selectedContact } = ContactSlice.actions;
export default ContactSlice.reducer;