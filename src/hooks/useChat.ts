import { useEffect, useState, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
import { userProfilePicState, userNameState } from "../atoms/users";
import { websiteThemeState, websiteAudioState } from "../atoms/website-theme";
import axios from "axios";
import io from "socket.io-client";
import { IChatStates } from "../common/types";

const BASE_URI = import.meta.env.VITE_BASE_URI;

interface Message {
    _id: any;
    message: string;
    username: string;
    profilePic: string;
}
interface InitialMessage {
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


const useChat = () => {
    const socket = io(BASE_URI, {
        transports: ['websocket']
    });

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
    const [chatState, setChatState] = useState<IChatStates>("DEN");
    const [userName, setUserName] = useRecoilState(userNameState);
    const [profilePicState, setProfilePicState] = useRecoilState(userProfilePicState);
    const notificationRef = useRef<HTMLAudioElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [websiteAudio, setWebsiteAudio] = useRecoilState(websiteAudioState);
    const modalRef = useRef<HTMLDivElement>(null);

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
                setUserName(data.username);
            }
            if (data.profilePic) {
                setProfilePicState(data.profilePic);
            }
        } catch (err: any) {
            console.log("profile-error", err.message);
        }
    }, [setProfilePicState, setUserName]);

    const fetchInitialMessages = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URI}/api/initialMessages`);
            const messages = response.data;
            if (messages) {
                setInitialMessages(messages);
            }
        } catch (err) {
            console.log("initial-messages-error", err);
        }
    }, []);

    const handleNewMessage = useCallback((msg: Message) => {
        setNewMessage((prevMessages: Message[]) => {
            notificationRef.current!.play();
            return [...prevMessages, msg];
        });
    }, []);

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
    }, [currentUserMessage, profilePicState, socket, userName]);

    const handleKeyDown = useCallback((e: any) => {
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            setCurrentUserMessage((prevValue) => prevValue + "\n");
        } else if (e.key === "Enter") {
            handleSendMessage();
        }
    }, [handleSendMessage]);

    const handleMusicPlayPause = useCallback(async () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                await audioRef.current.play();
                setMusicIsPlaying(true);
            } else {
                audioRef.current.pause();
                setMusicIsPlaying(false);
            }
        }
    }, []);

    useEffect(() => {
        if (audioRef.current && audioRef.current.src !== websiteAudio) {
            audioRef.current.src = websiteAudio;
            audioRef.current.play().catch(() => { });
        }
    }, [websiteAudio]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current !== event.target && !modalRef?.current?.contains?.(event.target as Node)) {
            setIsSettingsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

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
        modalRef,
        handleSendMessage,
        handleKeyDown,
        handleMusicPlayPause,
        socket,
        clickAnimation
    };
};

export default useChat;