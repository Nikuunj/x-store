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

interface addProductInterface {
    title: string;
    description: string;
    price: number;
    imageLink: string;
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

// const { title, description, price, imageLink } = req.body
export async function addProduct({ title, price, description,  imageLink }: addProductInterface): Promise<AxiosResponse<any> | undefined> {
    
    try {
        const response = await axios.post(`${BACKEND_URL}/seller/product`, {
            title,
            description,
            price,
            imageLink
        })
        return response
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response
        }
    }   
}