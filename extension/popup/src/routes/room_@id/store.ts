import type { Room } from "backend/src/types/socket.io";
import { atom } from "jotai";

export const roomAtom = atom<Room | undefined>(undefined);
