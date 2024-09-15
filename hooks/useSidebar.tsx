import { atom } from "jotai";

export const isMinimizedAtom = atom(false);

export const useSidebar = atom(
  (get) => get(isMinimizedAtom),
  (get, set) => set(isMinimizedAtom, !get(isMinimizedAtom))
);
