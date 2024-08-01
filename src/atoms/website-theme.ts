import { atom } from "recoil";
import onMusic from "../assets/on.mp3";
export const websiteThemeState = atom({
  key: "websiteThemeState",
  default: {

    bgColor: "#0000FF", textColor: "#ffffff", buttonColor: "#0000FF",
    container: {
      background: "#0000F"
    },
  },
});

export const chatAudioState = atom({
  key: "chatAudioState",
  default: onMusic,
});
