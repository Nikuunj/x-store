import { atom } from "recoil";

interface ToggleButton {
    seller: boolean;
    user: boolean;
}

export const toggleAtom = atom<ToggleButton>({
    key: 'toggleAtom',
    default: {
        seller: false,
        user: true
    },
})