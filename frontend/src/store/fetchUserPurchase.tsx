import { atom, selector, selectorFamily } from "recoil";


const userPurchaseListDefaultSelector = selector<any[]>({
    key: 'userPurchaseListDefaultSelector/Default',
    get: async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error('Failed to fetch orders');
        return await res.json();
    },
});

export const userPurchaseListState = atom<any[]>({
    key: 'userPurchaseListState',
    default: userPurchaseListDefaultSelector,
});

export const userPurchaseIdListSelector = selector<number[]>({
    key: 'userPurchaseIdListSelector',
    get: ({ get }) => {
        const orders = get(userPurchaseListState);
        return orders.map((user: any) => user.id);
    },
});

export const userPurchaseSelectorFamily = selectorFamily<any | null, string>({
    key: 'userPurchaseSelectorFamily',
    get:
      (orderId: string) =>
      ({ get }) => {
        const orders = get(userPurchaseListState);
        return orders.find((user: any) => user.id == orderId) || null;
      },
  });
  