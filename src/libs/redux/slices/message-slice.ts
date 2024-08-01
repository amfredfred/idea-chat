import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
    _id: any;
    message: string;
    username: string;
    profilePic: string;
}

export interface MessagesState {
    initialMessages: Message[];
    newMessages: Message[];
}

const initialState: MessagesState = {
    initialMessages: [],
    newMessages: []
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setInitialMessages(state, action: PayloadAction<Message[]>) {
            state.initialMessages = action.payload;
        },
        addNewMessage(state, action: PayloadAction<Message>) {
            state.newMessages.push(action.payload);
        }
    }
});

export const { setInitialMessages, addNewMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
