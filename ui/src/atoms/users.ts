import { atom } from "recoil";

export const userNameState = atom({
  key: "userNameState",
  default: "guest",
});

export const userProfilePicState = atom({
  key: "userProfilePicState",
  default: "https://vercel-123.s3.ap-south-1.amazonaws.com/bottle.png",
});
