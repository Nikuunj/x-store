import { atom, selector } from "recoil";

const userNameDefaultSelector = selector<string>({
  key: 'userNameDefaultSelector',
  get: () => {
    return localStorage.getItem('autherName') || '';
  },
});
    

export const userNameState = atom<string>({
  key: 'userNameState',
  default: userNameDefaultSelector,
});