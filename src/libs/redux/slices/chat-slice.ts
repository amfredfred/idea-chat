import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import onMusic from "../../../assets/on.mp3";
import { IChatStates } from '../../../common/types';

const BASE_URI = import.meta.env.VITE_BASE_URI;

export interface Message {
    _id: any;
    message: string;
    username: string;
    profilePic: string;
}

export interface Settings {
    visual: string;
    audio: string;
    motion: string;
}

export interface ChatState {
    userName: string;
    profilePic: string;
    initialMessages: Message[];
    newMessages: Message[];
    settingsModal: Settings;
    isChatSettingsOpen: boolean;
    chatAudio: string;
    isMusicPlaying: boolean;
    state: IChatStates;
    typedMessage: string;
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

// Async thunk to load initial messages
export const loadInitialMessages = createAsyncThunk(
    'chat/loadInitialMessages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URI}/api/initialMessages`);
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
            state.typedMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadInitialMessages.pending, (state) => {
                // Handle loading state if necessary
            })
            .addCase(loadInitialMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.initialMessages = action.payload;
            })
            .addCase(loadInitialMessages.rejected, (state, action) => {
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
