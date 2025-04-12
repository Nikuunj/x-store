import { atom, selector } from "recoil";
import { singInWithToken } from "../util/submitForm";


const userNameDefaultSelector = selector<string>({
  key: 'userNameDefaultSelector',
  get: async () => {
    const auther = localStorage.getItem('auther');
    if(auther) {
      const isValid = await singInWithToken(auther);
      if(!isValid) {
        console.log('not valid')
        localStorage.removeItem('autherName');
        localStorage.removeItem('auther');
        return '';
      }
    }
    return localStorage.getItem('autherName') ?? '';
  },
});
    

export const userNameState = atom<string>({
  key: 'userNameState',
  default: userNameDefaultSelector,
});