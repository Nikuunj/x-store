import { atom, selectorFamily } from "recoil";

interface FromData {
    field1: string;
    field2: string;
    field3: string;
}

const formState = atom<FromData>({
    key: 'formState',
    default: {
        field1: "1",
        field2: "2",
        field3: "3",
    },
});

const formFieldState = selectorFamily<string, keyof FromData>({
    key: 'FormField',
    get: field => ({get}) => get(formState)[field],
    set: field => ({set}, newValue) =>
        set(formState, prevState => ({...prevState, [field]: newValue})),
});