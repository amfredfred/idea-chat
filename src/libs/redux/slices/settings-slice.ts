import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChatStates } from '../../../common/types';

type Settings = {
    visual: string;
    audio: string;
    motion: string;

}

type SettingsState = {
    settingsModal: Settings;
    isSettingsOpen: boolean;
    chat: {
        state: IChatStates
    }
}

const initialState: SettingsState = {
    settingsModal: {
        visual: 'rem',
        audio: 'win',
        motion: 'focused'
    },
    isSettingsOpen: false,
    chat: {
        state: 'DEN'
    }
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettingsModal(state, action: PayloadAction<Settings>) {
            state.settingsModal = action.payload;
        },
        setIsSettingsOpen(state, action: PayloadAction<boolean>) {
            state.isSettingsOpen = action.payload;
        },
    }
});

export const { setSettingsModal, setIsSettingsOpen  } = settingsSlice.actions;
export default settingsSlice.reducer;
