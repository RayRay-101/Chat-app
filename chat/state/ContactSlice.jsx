import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedContact: null,
    contacts: [],// Array of contact objects
}

const ContactSlice = createSlice({
    name: 'contacts',
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