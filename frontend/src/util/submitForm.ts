import axios, { AxiosResponse } from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => ({
    headers: {
        token: localStorage.getItem('token') || ''
    }
});

interface SignupFromType {
    name: string;
    email: string;
    password: string;
}

type SignInFromType = Pick<SignupFromType, 'email' | 'password'>;

interface PurchaseOrederType {
    productId: string;
    deliveyAddress: string;
}

interface addProductInterface {
    title: string;
    description: string;
    price: number;
    imageLink: string;
}

interface editProduct extends addProductInterface {
    productId: string;
}

export async function signUpSubmitFormUser({ name, email, password }: SignupFromType): Promise<AxiosResponse<any> | undefined> {
    console.log({ name, email, password });

    try {
        const response = await axios.post(`${BACKEND_URL}/user/signup`, {
            name,
            email,
            password
        });

        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function signUpSubmitFormSeller({ name, email, password }: SignupFromType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEND_URL}/seller/signup`, {
            name,
            email,
            password
        });
        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function signInSubmitFormUser({ email, password }: SignInFromType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/signin`, {
            email,
            password
        });
        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function signInSubmitFormSeller({ email, password }: SignInFromType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEND_URL}/seller/signin`, {
            email,
            password
        });
        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function purchaseOrderFormUser({ deliveyAddress, productId }: PurchaseOrederType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/product/${productId}`, {
            deliveyAddress
        }, getAuthHeader());
        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function signOutFunction(): Promise<boolean> {
    try {
        await axios.get(`${BACKEND_URL}/signout`, getAuthHeader());
        return true;
    } catch (e) {
        return false;
    }
}

export async function singInWithToken(auther: string): Promise<boolean> {
    try {
        await axios.get(`${BACKEND_URL}/${auther}`, getAuthHeader());
        return true;
    } catch (e) {
        return false;
    }
}

export async function addProduct({ title, price, description, imageLink }: addProductInterface): Promise<AxiosResponse<any> | undefined> {
    console.log({ title, price, description, imageLink });

    try {
        const response = await axios.post(`${BACKEND_URL}/seller/product`, {
            title,
            description,
            price,
            imageLink
        }, getAuthHeader());
        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function deleteProduct({ productId }: { productId: string}): Promise<AxiosResponse<any> | undefined> {

    try {
        const response = await axios.delete(`${BACKEND_URL}/seller/${productId}`, getAuthHeader());
        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function editProduct({ productId, title, description, price, imageLink }: editProduct): Promise<AxiosResponse<any> | undefined> {

    console.log({ productId, title, description, price, imageLink });
    try {
        const response = await axios.put(`${BACKEND_URL}/seller/${productId}`, {
            title,
            description,
            price,
            imageLink
        }, getAuthHeader());
        return response;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}