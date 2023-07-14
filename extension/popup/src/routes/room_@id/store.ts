import type { RoomObj } from "backend/src/types/socket.io";
import { atom } from "jotai";

export const roomAtom = atom<RoomObj | undefined>(undefined);
