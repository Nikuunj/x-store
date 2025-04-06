import { atom, selector, selectorFamily } from 'recoil'

// Selector to fetch the user list
const userListDefaultSelector = selector<any[]>({
  key: 'userListState/Default',
  get: async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  },
});

// Atom that uses the selector as its default
export const userListState = atom<any[]>({
  key: 'userListState',
  default: userListDefaultSelector,
});

export const userIdListSelector = selector<number[]>({
  key: 'userIdListSelector',
  get: ({ get }) => {
    const users = get(userListState);
    return users.map((user: any) => user.id);
  },
});

// SelectorFamily to get a specific user by ID from userListState
export const userSelectorFamily = selectorFamily({
  key: 'userSelectorFamily',
  get:
    (userId: number) =>
    ({ get }) => {
      const users = get(userListState)
      return users.find((user: any) => user.id === userId) || null
    },
})
