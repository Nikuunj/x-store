import { atom, selector, selectorFamily } from 'recoil'

// Atom to store the full list of users
export const userListState = atom<any[]>({
  key: 'userListState',
  default: [],
})

// Selector that you can manually trigger to fetch and set the atom
export const fetchAndSetUserListSelector = selector<any[]>({
  key: 'fetchAndSetUserListSelector',
  get: () => [], // dummy return
  set: async ({ set }, _newValue) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    const data = await res.json();
    set(userListState, data); // ✅ This is valid
  },
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
