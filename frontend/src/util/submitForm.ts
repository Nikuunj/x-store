import axios, { AxiosError } from "axios";

const BACKEDN_URL = import.meta.env.VITE_BACKEND_URL;


interface SubmitFromType {
    name:string;
    email:string;
    password: string
}
export async function signUpSubmitFormUser({ name, email , password }: SubmitFromType): Promise<number> {

    try {
        const response = await axios.post(`${BACKEDN_URL}/user/signup`, {
            name,
            email,
            password  
        })

        return response.status;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response.status;
        } else {
            console.error("Unexpected error:", e);
            return 500; // or any fallback status
        }
    }
}

export async function signInSubmitFormUser({ name, email , password }: SubmitFromType): Promise<number> {

    try {
        const response = await axios.post(`${BACKEDN_URL}/user/signin`, {
            name,
            email,
            password  
        })
        return response.status;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response.status;
        } else {
            console.error("Unexpected error:", e);
            return 500; // or any fallback status
        }
    }
}


export async function signUpSubmitFormSeller({ name, email , password }: SubmitFromType): Promise<number> {
    try {
        const response = await axios.post(`${BACKEDN_URL}/seller/signup`, {
            name,
            email,
            password  
        })
        return response.status;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response.status;
        } else {
            console.error("Unexpected error:", e);
            return 500; // or any fallback status
        }
    }
}

export async function signInSubmitFormSeller({ name, email , password }: SubmitFromType): Promise<number> {
    try {
        const response = await axios.post(`${BACKEDN_URL}/seller/signin`, {
            name,
            email,
            password  
        })
        return response.status;
    } catch(e) {
        if (axios.isAxiosError(e) && e.response) {
            return e.response.status;
        } else {
            console.error("Unexpected error:", e);
            return 500; // or any fallback status
        }
    }
}