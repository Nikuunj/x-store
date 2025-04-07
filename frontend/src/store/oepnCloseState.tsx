import { atom, atomFamily } from "recoil";

export const elementOpenStateFamily = atomFamily<boolean, string>({
    key: 'ElementPosition',
    default: false,
});

export const submitAtom = atom<boolean>({
    key: 'submitAtom',
    default: false,
})

export const navBarAtom = atom<boolean>({
    key: 'navBarAtom',
    default: false,
})