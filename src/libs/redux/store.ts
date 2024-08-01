import { configureStore } from '@reduxjs/toolkit'
import tokenSwapReducer from './slices/token-swap-slice'
import appReducer from './slices/app-slice'
import themeReducer from './slices/theme-slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            tokenSwap: tokenSwapReducer,
            app: appReducer,
            theme: themeReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']