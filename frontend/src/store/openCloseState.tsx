import { atom, atomFamily } from "recoil";

export const productOpenStateFamily = atomFamily<boolean, string>({
    key: 'productOpenStateFamily',
    default: false,
});

export const showDetailState = atom<boolean>({
    key: 'showDetailState',
    default: false
})

export const submitAtom = atom<boolean>({
    key: 'submitAtom',
    default: false,
})

export const editAtom = atom<boolean>({
    key: 'editAtom',
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


export const sellerOrderEditAtomFamily = atomFamily<boolean, string>({
    key: 'sellerOrderEditAtomFamily',
    default: false,
});

export const userOrderOpenAtomFamily = atomFamily<boolean, string>({
    key: 'UserOrderOpenAtomFamily',
    default: false,
});

export const sellerOrderOpenAtomFamily = atomFamily<boolean, string>({
    key: 'sellerOrderOpenAtomFamily',
    default: false,
});

export const sellerOwnOpenAtomFamily = atomFamily<boolean, string>({
    key: 'sellerOwnOpenAtomFamily',
    default: false,
});

export const showDetailStateFamily = atomFamily<boolean, string>({
    key: 'showDetailStateFamily',
    default: false,
});