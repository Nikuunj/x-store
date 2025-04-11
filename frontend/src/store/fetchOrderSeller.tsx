import { atom, selector, selectorFamily } from "recoil";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const sellerOrderListDefaultSelector = selector<any[]>({
    key: 'sellerOrderListDefaultSelector/Default',
    get: async () => {
        const res = await fetch(`${BACKEND_URL}/seller/purchase`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        return await res.json();
    },
});

export const sellerOrderListState = atom<any[]>({
    key: 'sellerOrderListState',
    default: sellerOrderListDefaultSelector,
});

export const sellerOrderIdListSelector = selector<number[]>({
    key: 'sellerOrderIdListSelector',
    get: ({ get }) => {
        const orders = get(sellerOrderListState);
        return orders.map((user: any) => user.id);
    },
});

export const sellerOrderSelectorFamily = selectorFamily<any | null, string>({
    key: 'sellerOrderSelectorFamily',
    get:
        (orderId: string) =>
        ({ get }) => {
        const orders = get(sellerOrderListState)
        return orders.find((user: any) => user.id == orderId) || null
        },
})