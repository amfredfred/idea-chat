import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChatStates } from '../../../common/types';
import onMusic from "../../../assets/on.mp3";

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
    chatAudio: string;
    isMusicPlaying: boolean;
    state: IChatStates,
    typedMessage: string
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
    chatAudio: onMusic,
    isMusicPlaying: false,
    state: 'PUMP.RAY',
    typedMessage: ''
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
            state.isChatSettingsOpen = action.payload;
        },
        setChatAudio(state, action: PayloadAction<string>) {
            state.chatAudio = action.payload;
        },
        setWebsiteMotion(state, action: PayloadAction<string>) {
            state.settingsModal.motion = action.payload;
        },
        setMusicIsPlaying(state, action: PayloadAction<boolean>) {
            state.isMusicPlaying = action.payload;
        },
        setChatState(state, action: PayloadAction<IChatStates>) {
            state.state = action.payload;
        },
        setTypedMessage: (state, action: PayloadAction<string>) => {
            state.typedMessage = action.payload
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
    setChatAudio,
    setMusicIsPlaying,
    setWebsiteMotion,
    setChatState,
    setTypedMessage
} = chatSlice.actions;

export default chatSlice.reducer;