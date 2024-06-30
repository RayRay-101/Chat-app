import { createSlice } from "@reduxjs/toolkit";

const profileSlice  = createSlice({
    name: 'profile',
    initialState: {
        selectedProfile: null,
    },
    reducers: {
        selectProfile:(state, action) => {
            state.selectedProfile = action.payload;
        },
        clearProfile: (state) => {
            state.selectedProfile = null;
        },
    },
});

export const { selectProfile, clearProfile} = profileSlice.actions;
export default profileSlice.reducer;