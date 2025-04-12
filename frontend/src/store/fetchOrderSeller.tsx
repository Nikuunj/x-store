import { atom, selector, selectorFamily } from "recoil";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const sellerOrderListDefaultSelector = selector<any[]>({
    key: 'sellerOrderListDefaultSelector/Default',
    get: async () => {
      try {
          const res = await fetch(`${BACKEND_URL}/seller/purchase`, {
            credentials: "include",
          });
    
          if (!res.ok) {
            throw new Error('Failed to fetch orders');
          }
    
          const data = await res.json();
          return data.innterJoin || [];
      } catch (err) {
        throw err;
      }
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
        return orders.map((order: any) => order._id);
    },
});

export const sellerOrderSelectorFamily = selectorFamily<any | null, string>({
    key: 'sellerOrderSelectorFamily',
    get:
        (orderId: string) =>
        ({ get }) => {
        const orders = get(sellerOrderListState)
        return orders.find((order: any) => order._id == orderId) || null
    },
})