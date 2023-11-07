import { AVATAR_BG_COLOR } from "./constants";

export const randomBgColor = () => {
  const index = Math.floor(Math.random() * 4);
  return AVATAR_BG_COLOR[index];
};
