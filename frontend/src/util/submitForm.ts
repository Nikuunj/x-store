import axios, { AxiosResponse } from "axios";

const BACKEDN_URL = import.meta.env.VITE_BACKEND_URL;


interface SubmitFromType {
    name:string;
    email:string;
    password: string
}

interface PurchaseOrederType {
    productId: string;
    deliveyAddress: string;
}
export async function signUpSubmitFormUser({ name, email , password }: SubmitFromType): Promise<AxiosResponse<any> | undefined> {

    try {
        const response = await axios.post(`${BACKEDN_URL}/user/signup`, {
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

export async function signInSubmitFormUser({ name, email , password }: SubmitFromType): Promise<AxiosResponse<any> | undefined> {

    try {
        const response = await axios.post(`${BACKEDN_URL}/user/signin`, {
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


export async function signUpSubmitFormSeller({ name, email , password }: SubmitFromType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEDN_URL}/seller/signup`, {
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

export async function signInSubmitFormSeller({ name, email , password }: SubmitFromType): Promise<AxiosResponse<any> | undefined> {
    try {
        const response = await axios.post(`${BACKEDN_URL}/seller/signin`, {
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
        const response = await axios.post(`${BACKEDN_URL}/user/product/${productId}`, {
            deliveyAddress
        })
        return response
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response
        }
    }
}