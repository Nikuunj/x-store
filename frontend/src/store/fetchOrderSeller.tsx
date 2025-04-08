import { atom, selector, selectorFamily } from "recoil";

// Selector to fetch the user list
const sellerOrderListDefaultSelector = selector<any[]>({
    key: 'sellerOrderListDefaultSelector/Default',
    get: async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        return await res.json();
    },
});

// Atom that uses the selector as its default
export const sellerOrderListState = atom<any[]>({
    key: 'sellerOrderListState',
    default: sellerOrderListDefaultSelector,
});

export const sellerOrderIdListSelector = selector<number[]>({
    key: 'sellerOrderIdListSelector',
    get: ({ get }) => {
        const users = get(sellerOrderListState);
        return users.map((user: any) => user.id);
    },
});

// SelectorFamily to get a specific user by ID from productListState
export const sellerOrderSelectorFamily = selectorFamily<any | null, string>({
    key: 'sellerOrderSelectorFamily',
    get:
        (userId: string) =>
        ({ get }) => {
        const users = get(sellerOrderListState)
        return users.find((user: any) => user.id == userId) || null
        },
})