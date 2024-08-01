import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
    _id: any;
    message: string;
    username: string;
    profilePic: string;
}

interface Settings {
    visual: string;
    audio: string;
    motion: string;
}

interface ChatState {
    userName: string;
    profilePic: string;
    initialMessages: Message[];
    newMessages: Message[];
    settingsModal: Settings;
    isSettingsOpen: boolean;
    websiteAudio: string;
    isMusicPlaying: boolean;
}

const initialState: ChatState = {
    userName: '',
    profilePic: '',
    initialMessages: [],
    newMessages: [],
    settingsModal: {
        visual: 'rem',
        audio: 'win',
        motion: 'focused'
    },
    isSettingsOpen: false,
    websiteAudio: '',
    isMusicPlaying: true
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setProfilePic(state, action: PayloadAction<string>) {
            state.profilePic = action.payload;
        },
        setInitialMessages(state, action: PayloadAction<Message[]>) {
            state.initialMessages = action.payload;
        },
        addNewMessage(state, action: PayloadAction<Message>) {
            state.newMessages.push(action.payload);
        },
        setSettingsModal(state, action: PayloadAction<Settings>) {
            state.settingsModal = action.payload;
        },
        setIsSettingsOpen(state, action: PayloadAction<boolean>) {
            state.isSettingsOpen = action.payload;
        },
        setWebsiteAudio(state, action: PayloadAction<string>) {
            state.websiteAudio = action.payload;
        },
        setMusicIsPlaying(state, action: PayloadAction<boolean>) {
            state.isMusicPlaying = action.payload;
        }
    }
});

export const {
    setUserName,
    setProfilePic,
    setInitialMessages,
    addNewMessage,
    setSettingsModal,
    setIsSettingsOpen,
    setWebsiteAudio,
    setMusicIsPlaying
} = chatSlice.actions;

export default chatSlice.reducer;