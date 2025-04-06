import { atomFamily } from "recoil";

export const elementOpenStateFamily = atomFamily<boolean, string>({
    key: 'ElementPosition',
    default: false,
});