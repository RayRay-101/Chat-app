import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from './features/chat/chatSlice';
import userReducer from './features/user/userSlice';

const rootReducer = combineReducers({
    chat: chatReducer,
    user: userReducer,
})

export default rootReducer;