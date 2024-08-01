import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfileState {
    userName: string;
    profilePic: string;
}

const initialState: UserProfileState = {
    userName: '',
    profilePic: ''
};

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setProfilePic(state, action: PayloadAction<string>) {
            state.profilePic = action.payload;
        }
    }
});

export const { setUserName, setProfilePic } = userProfileSlice.actions;
export default userProfileSlice.reducer;