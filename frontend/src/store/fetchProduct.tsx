import { atom, selector, selectorFamily } from 'recoil'

const productListDefaultSelector = selector<any[]>({
  key: 'productListState/Default',
  get: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  },
});

export const productListState = atom<any[]>({
  key: 'productListState',
  default: productListDefaultSelector,
});

export const productIdListSelector = selector<number[]>({
  key: 'productIdListSelector',
  get: ({ get }) => {
    const products = get(productListState);
    return products.map((user: any) => user.id);
  },
});

export const productSelectorFamily = selectorFamily<any | null, string>({
  key: 'productSelectorFamily',
  get:
    (productId: string) =>
    ({ get }) => {
      const products = get(productListState)
      return products.find((user: any) => user.id == productId) || null
    },
})
