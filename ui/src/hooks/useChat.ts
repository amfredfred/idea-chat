// useChat.ts
import { useState, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { socket } from '@src/api/socket-Io';
import {
    websiteThemeState,
    websiteAudioState
} from '@src/atoms/website-theme';

import {
    userNameState,
    userProfilePicState,
} from '@src/atoms/users'

const BASE_URI = import.meta.env.VITE_BASE_URI;

interface Message {
    _id: string | number;
    message: string;
    username: string;
    profilePic: string;
}

interface InitialMessage {
    _id: string | number;
    message: string;
    username: string;
    profilePic: string;
}

interface Settings {
    visual: string;
    audio: string;
    motion: string;
}

const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;

const useChat = () => {
    const [currentUserMessage, setCurrentUserMessage] = useState("");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMusicPlaying, setMusicIsPlaying] = useState(true);
    const [settingsModal, setSettingsModal] = useState<Settings>({
        visual: "rem",
        audio: "win",
        motion: "focused",
    });
    const [websiteTheme, setWebsiteTheme] = useRecoilState(websiteThemeState);
    const [initialMessages, setInitialMessages] = useState<InitialMessage[]>([]);
    const [newMessage, setNewMessage] = useState<Message[]>([]);
    const [chatState, setChatState] = useState<"DEN" | "PUMP" | "ALPHA">("DEN");
    const [userName, setUserName] = useRecoilState(userNameState);
    const [profilePicState, setProfilePicState] = useRecoilState(userProfilePicState);
    const notificationRef = useRef<HTMLAudioElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [websiteAudio, setWebsiteAudio] = useRecoilState(websiteAudioState);
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        audioRef.current!.play();
        const loadUserProfile = async () => {
            const wAddress = localStorage.getItem("walletAddress");
            try {
                const response = await axios.get(
                    `${BASE_URI}/api/user-profile?walletAddress=${wAddress}`
                );
                const data = response.data;
                if (data.username) {
                    setUserName(data.username);
                }
                if (data.profilePic) {
                    setProfilePicState(data.profilePic);
                }
            } catch (err: any) {
                console.log("profile-error", err.message);
            }
        };
        loadUserProfile();

        const loadInitialMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URI}/api/initialMessages`);
                const messages = response.data;
                if (messages) {
                    setInitialMessages(messages);
                }
            } catch (err) {
                console.log("initial-messages-error", err);
            }
        };
        loadInitialMessages();

        const handleNewMessage = (msg: Message) => {
            setNewMessage((prevMessages: Message[]) => {
                notificationRef.current!.play();
                return [...prevMessages, msg];
            });
        };
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("initialMessages");
            socket.off("newMessage", handleNewMessage);
        };
    }, []);

    const handleSendMessage = () => {
        if (currentUserMessage.length <= 500) {
            if (currentUserMessage.trim()) {
                socket.emit("sendMessage", {
                    username: userName,
                    message: currentUserMessage,
                    profilePic: profilePicState,
                });
                setCurrentUserMessage("");
            }
        } else {
            alert("Character count exceeds 500");
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            setCurrentUserMessage((prevValue) => prevValue + "\n");
        } else if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const clickAnimation = {
        scale: 0.9,
        transition: { type: "spring", stiffness: 400, damping: 10 },
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = websiteAudio;
            audioRef.current.play();
        }
    }, [websiteAudio]);

    const handleMusicPlayPause = () => {
        if (isMusicPlaying) {
            audioRef.current?.pause();
            setMusicIsPlaying(false);
        } else {
            audioRef.current?.play();
            setMusicIsPlaying(true);
        }
    };

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return {
        currentUserMessage,
        setCurrentUserMessage,
        isSettingsOpen,
        setIsSettingsOpen,
        isMusicPlaying,
        setMusicIsPlaying,
        settingsModal,
        setSettingsModal,
        websiteTheme,
        setWebsiteTheme,
        initialMessages,
        setInitialMessages,
        newMessage,
        setNewMessage,
        chatState,
        setChatState,
        userName,
        setUserName,
        profilePicState,
        setProfilePicState,
        notificationRef,
        audioRef,
        websiteAudio,
        setWebsiteAudio,
        navigate,
        modalRef,
        handleSendMessage,
        handleKeyDown,
        handleMusicPlayPause,
        clickAnimation,
        totalWidth,
        totalHeight
    };
};

export default useChat;
