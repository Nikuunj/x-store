import axios, { AxiosResponse } from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


interface SignupFromType {
    name:string;
    email:string;
    password: string
}

type SignInFromType = Pick<SignupFromType, 'email' | 'password'>
interface PurchaseOrederType {
    productId: string;
    deliveyAddress: string;
}

export async function signUpSubmitFormUser({ name, email , password }: SignupFromType): Promise<AxiosResponse<any> | undefined> {

    try {
        const response = await axios.post(`${BACKEND_URL}/user/signup`, {
            name,
            email,
            password  
        })

        return response;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function signUpSubmitFormSeller({ name, email , password }: SignupFromType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEND_URL}/seller/signup`, {
            name,
            email,
            password  
        })
        return response;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function signInSubmitFormUser({ email , password }: SignInFromType): Promise<AxiosResponse<any> | undefined> {

    try {
        const response = await axios.post(`${BACKEND_URL}/user/signin`, {
            name,
            email,
            password  
        })
        return response;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}
export async function signInSubmitFormSeller({ email , password }: SignInFromType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEND_URL}/seller/signin`, {
            name,
            email,
            password  
        })
        return response;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response;
        }
    }
}

export async function purchaseOrderFormUser({ deliveyAddress, productId }: PurchaseOrederType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/product/${productId}`, {
            deliveyAddress
        })
        return response
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response
        }
    }
}

export async function signOutFunction(): Promise<boolean> {
    try {
        await axios.get(`${BACKEND_URL}/signout`)
        return true
    } catch(e) {
        return false
    }
}

export async function singInWithToken(auther:string): Promise<boolean> {
    try {
        await axios.get(`${BACKEND_URL}/${auther}`)
        return true
    } catch(e) {
        return false
    }
}


export const fetchProductsBySkip = async (skip: number): Promise<any[]> => {
    const res = await fetch(`${BACKEND_URL}/product/${skip}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.productAll;
  };
  