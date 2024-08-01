import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChatStates } from '../../../common/types';

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
    isChatSettingsOpen: boolean;
    websiteAudio: string;
    isMusicPlaying: boolean;
    state: IChatStates
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
    isChatSettingsOpen: false,
    websiteAudio: '',
    isMusicPlaying: true,
    state: 'DEN'
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
        setChatSettingsOpen(state, action: PayloadAction<boolean>) {
            console.log(action)
            state.isChatSettingsOpen = action.payload;
        },
        setWebsiteAudio(state, action: PayloadAction<string>) {
            state.websiteAudio = action.payload;
        },
        setWebsiteMotion(state, action: PayloadAction<string>) {
            state.settingsModal.motion = action.payload;
        },
        setMusicIsPlaying(state, action: PayloadAction<boolean>) {
            state.isMusicPlaying = action.payload;
        },
        setChatState(state, action: PayloadAction<IChatStates>) {
            state.state = action.payload;
        }
    }
});

export const {
    setUserName,
    setProfilePic,
    setInitialMessages,
    addNewMessage,
    setSettingsModal,
    setChatSettingsOpen,
    setWebsiteAudio,
    setMusicIsPlaying,
    setWebsiteMotion,
    setChatState
} = chatSlice.actions;

export default chatSlice.reducer;