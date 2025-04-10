import { atom, atomFamily } from "recoil";

export const productOpenStateFamily = atomFamily<boolean, string>({
    key: 'ElementPosition',
    default: false,
});

export const submitAtom = atom<boolean>({
    key: 'submitAtom',
    default: false,
})

export const signOutState = atom<boolean>({
    key: 'signOutState',
    default: false,
})

export const navBarAtom = atom<boolean>({
    key: 'navBarAtom',
    default: false,
})


export const userOrderOpenAtomFamily = atomFamily<boolean, string>({
    key: 'UserOrderOpenAtomFamily',
    default: false,
});

export const sellerOrderOpenAtomFamily = atomFamily<boolean, string>({
    key: 'sellerOrderOpenAtomFamily',
    default: false,
});