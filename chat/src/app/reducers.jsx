import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from './features/chat/chatSlice';
import userReducer from './features/user/userSlice';
import profileReducer from "./features/profile/profileSlice";


const rootReducer = combineReducers({
    chat: chatReducer,
    user: userReducer,
    profile: profileReducer,

})

export default rootReducer;