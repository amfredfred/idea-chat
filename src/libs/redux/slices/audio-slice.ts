import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioState {
    websiteAudio: string;
    isMusicPlaying: boolean;
}

const initialState: AudioState = {
    websiteAudio: '',
    isMusicPlaying: true
};

const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        setWebsiteAudio(state, action: PayloadAction<string>) {
            state.websiteAudio = action.payload;
        },
        setMusicIsPlaying(state, action: PayloadAction<boolean>) {
            state.isMusicPlaying = action.payload;
        }
    }
});

export const { setWebsiteAudio, setMusicIsPlaying } = audioSlice.actions;
export default audioSlice.reducer;
