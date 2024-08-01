import { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";
import { setUserName, setProfilePic } from "../libs/redux/slices/user-profile-slice";
import { setInitialMessages, addNewMessage } from "../libs/redux/slices/message-slice";
import { setSettingsModal, setIsSettingsOpen } from "../libs/redux/slices/settings-slice";
import { setWebsiteAudio, setMusicIsPlaying } from "../libs/redux/slices/audio-slice";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import { Message } from "../libs/redux/slices/message-slice";

const BASE_URI = import.meta.env.VITE_BASE_URI;

const useChat = () => {
    const socket = io(BASE_URI, {
        transports: ['websocket']
    });

    const dispatch = useAppDispatch();
    const currentUserMessage = useAppSelector(state => state.messages.newMessages);
    const isSettingsOpen = useAppSelector(state => state.settings.isSettingsOpen);
    const isMusicPlaying = useAppSelector(state => state.audio.isMusicPlaying);
    const settingsModal = useAppSelector(state => state.settings.settingsModal);
    const initialMessages = useAppSelector(state => state.messages.initialMessages);
    const newMessages = useAppSelector(state => state.messages.newMessages);
    const userName = useAppSelector(state => state.userProfile.userName);
    const profilePicState = useAppSelector(state => state.userProfile.profilePic);
    const websiteAudio = useAppSelector(state => state.audio.websiteAudio);
    const chatState = useAppSelector(state => state.settings.chat.state)
    const notificationRef = useRef<HTMLAudioElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleSettings = (state: boolean) => dispatch(setIsSettingsOpen(state));

    const clickAnimation = {
        scale: 0.9,
        transition: { type: "spring", stiffness: 400, damping: 10 },
    };

    const fetchUserProfile = useCallback(async () => {
        const wAddress = localStorage.getItem("walletAddress");
        try {
            const response = await axios.get(
                `${BASE_URI}/api/user-profile?walletAddress=${wAddress}`
            );
            const data = response.data;
            if (data.username) {
                dispatch(setUserName(data.username));
            }
            if (data.profilePic) {
                dispatch(setProfilePic(data.profilePic));
            }
        } catch (err: any) {
            console.log("profile-error", err.message);
        }
    }, [dispatch]);

    const fetchInitialMessages = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URI}/api/initialMessages`);
            const messages = response.data;
            if (messages) {
                dispatch(setInitialMessages(messages));
            }
        } catch (err) {
            console.log("initial-messages-error", err);
        }
    }, [dispatch]);

    const handleNewMessage = useCallback((msg: Message) => {
        dispatch(addNewMessage(msg));
        notificationRef.current!.play();
    }, [dispatch]);

    useEffect(() => {
        fetchUserProfile();
        fetchInitialMessages();

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [fetchUserProfile, fetchInitialMessages, handleNewMessage, socket]);

    const handleSendMessage = useCallback(() => {
        if (currentUserMessage.length <= 500) {
            // if (currentUserMessage.trim()) {
            //     socket.emit("sendMessage", {
            //         username: userName,
            //         message: currentUserMessage,
            //         profilePic: profilePicState,
            //     });
            //     // setCurrentUserMessage("");
            // }
        } else {
            alert("Character count exceeds 500");
        }
    }, [currentUserMessage, profilePicState, socket, userName]);

    const handleKeyDown = useCallback((e: any) => {
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            // setCurrentUserMessage((prevValue) => prevValue + "\n");
        } else if (e.key === "Enter") {
            handleSendMessage();
        }
    }, [handleSendMessage]);

    const handleMusicPlayPause = useCallback(async () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                await audioRef.current.play();
                dispatch(setMusicIsPlaying(true));
            } else {
                audioRef.current.pause();
                dispatch(setMusicIsPlaying(false));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (audioRef.current && audioRef.current.src !== websiteAudio) {
            audioRef.current.src = websiteAudio;
            audioRef.current.play().catch(() => { });
        }
    }, [websiteAudio]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current !== event.target && !modalRef?.current?.contains?.(event.target as Node)) {
            dispatch(setIsSettingsOpen(false));
        }
    }, [dispatch]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    return {
        currentUserMessage,
        isSettingsOpen,
        setIsSettingsOpen,
        isMusicPlaying,
        setMusicIsPlaying,
        settingsModal,
        setSettingsModal,
        initialMessages,
        setInitialMessages,
        newMessages,
        userName,
        setUserName,
        profilePicState,
        notificationRef,
        audioRef,
        websiteAudio,
        setWebsiteAudio,
        modalRef,
        handleSendMessage,
        handleKeyDown,
        handleMusicPlayPause,
        socket,
        chatState,
        clickAnimation,
        toggleSettings
    };
};

export default useChat;
