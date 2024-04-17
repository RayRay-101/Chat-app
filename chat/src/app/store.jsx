import { configureStore } from "@reduxjs/toolkit";
import contactReducer from '../app/ContactSlice'

export const store = configureStore({
    reducer: {
      contact: contactReducer,
    }
  });
  

export default store;