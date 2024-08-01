import { configureStore } from '@reduxjs/toolkit'
import tokenSwapSlice from './slices/token-swap-slice'
import appSlice from './slices/app-slice'
import themeSlice from './slices/theme-slice'
import userProfileSlice from './slices/user-profile-slice'
import messagesSlice from './slices/message-slice'
// import settingsSlice from './slices/settings-slice'
import audioSlice from './slices/audio-slice'
import chatSlice from './slices/chat-slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            tokenSwap: tokenSwapSlice,
            app: appSlice,
            theme: themeSlice,
            userProfile: userProfileSlice,
            messages: messagesSlice,
            audio: audioSlice,

            chat: chatSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']