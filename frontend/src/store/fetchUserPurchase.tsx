import { atom, selector, selectorFamily } from "recoil";

// Selector to fetch the user list
const purchaseListDefaultSelector = selector<any[]>({
    key: 'purchaseListDefaultSelector/Default',
    get: async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        return await res.json();
    },
});

// Atom that uses the selector as its default
export const purchaseListState = atom<any[]>({
    key: 'purchaseListState',
    default: purchaseListDefaultSelector,
});

export const purchaseIdListSelector = selector<number[]>({
    key: 'purchaseIdListSelector',
    get: ({ get }) => {
        const users = get(purchaseListState);
        return users.map((user: any) => user.id);
    },
});

// SelectorFamily to get a specific user by ID from productListState
export const purchaseSelectorFamily = selectorFamily({
    key: 'purchaseSelectorFamily',
    get:
        (userId: number) =>
        ({ get }) => {
        const users = get(purchaseListState)
        return users.find((user: any) => user.id === userId) || null
        },
})