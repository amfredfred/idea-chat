import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioState {
    chatAudio: string;
    isMusicPlaying: boolean;
}

const initialState: AudioState = {
    chatAudio: '',
    isMusicPlaying: true
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setChatAudio(state, action: PayloadAction<string>) {
            state.chatAudio = action.payload;
        },
        setMusicIsPlaying(state, action: PayloadAction<boolean>) {
            state.isMusicPlaying = action.payload;
        }
    }
});

export const { setChatAudio, setMusicIsPlaying } = audioSlice.actions;
export default audioSlice.reducer;
