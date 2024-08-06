import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import onMusic from "../../../assets/on.mp3";
import { IChatStates } from '../../../common/types';

const BASE_URI = import.meta.env.VITE_MESSENGER_API_URL;

export interface Message {
    _id: any;
    message: string;
    username: string;
    profilePic: string;
    position: {
        x: number,
        y: number
    }
}

export interface Settings {
    visual: string;
    audio: string;
    motion: 'focused' | 'chaos' | null;
}

export interface ChatState {
    userName: string;
    profilePic: string;
    initialMessages: Message[];
    newMessage: Message | null;
    settingsModal: Settings;
    isChatSettingsOpen: boolean;
    chatAudio: string;
    isMusicPlaying: boolean;
    state: IChatStates;
    typedMessage: string;
    isLoadingInitialMessages: boolean
}

const initialState: ChatState = {
    userName: '',
    profilePic: '',
    initialMessages: [],
    newMessage: null,
    settingsModal: {
        visual: 'rem',
        audio: 'win',
        motion: null
    },
    isChatSettingsOpen: false,
    chatAudio: onMusic,
    isMusicPlaying: false,
    state: 'PUMP.RAY',
    typedMessage: '',
    isLoadingInitialMessages: false
};

// Async thunk to load initial messages
export const loadInitialMessages = createAsyncThunk(
    'chat/loadInitialMessages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URI}initialMessages`);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

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
        addNewMessage(state, action: PayloadAction<Message>) {
            state.newMessage = action.payload;
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
        setWebsiteMotion(state, action: PayloadAction<Settings['motion']>) {
            state.settingsModal.motion = action.payload;
        },
        setMusicIsPlaying(state, action: PayloadAction<boolean>) {
            state.isMusicPlaying = action.payload;
        },
        setChatState(state, action: PayloadAction<IChatStates>) {
            state.state = action.payload;
        },
        setTypedMessage: (state, action: PayloadAction<string>) => {
            state.typedMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadInitialMessages.pending, (state) => {
                // Handle loading state if necessary
                state.isLoadingInitialMessages = true
            })
            .addCase(loadInitialMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                console.log(action)
                state.initialMessages = action.payload;
                state.isLoadingInitialMessages = false
            })
            .addCase(loadInitialMessages.rejected, (state, action) => {
                state.isLoadingInitialMessages = false
                console.error('Failed to load initial messages:', action.payload);
            });
    }
});

export const {
    setUserName,
    setProfilePic,
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
