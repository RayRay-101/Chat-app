import { configureStore } from "@reduxjs/toolkit";
// import { contactsReducer } from "./ContactSlice"

const store = configureStore({
    // contacts: contactsReducer 
    reducer: {}
  });
  

export default store;