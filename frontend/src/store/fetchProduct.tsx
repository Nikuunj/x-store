import { atom, selector, selectorFamily } from 'recoil'

// Selector to fetch the user list
const productListDefaultSelector = selector<any[]>({
  key: 'productListState/Default',
  get: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  },
});

// Atom that uses the selector as its default
export const productListState = atom<any[]>({
  key: 'productListState',
  default: productListDefaultSelector,
});

export const productIdListSelector = selector<number[]>({
  key: 'productIdListSelector',
  get: ({ get }) => {
    const users = get(productListState);
    return users.map((user: any) => user.id);
  },
});

// SelectorFamily to get a specific user by ID from productListState
export const productSelectorFamily = selectorFamily({
  key: 'productSelectorFamily',
  get:
    (userId: number) =>
    ({ get }) => {
      const users = get(productListState)
      return users.find((user: any) => user.id === userId) || null
    },
})
