import { useRef } from "react";
import InputBox from "../components/InputBox";
import TextBlock from "../components/TextBlock";
import { addProductInputRef } from "../util/util";
import { useNavigate } from "react-router";
import { addProduct } from "../util/submitForm";

function AddProduct() {
    const ref = useRef<any>(Array(addProductInputRef.length).fill(0));
    const navigate = useNavigate();

    async function submitAddProductForm() {
        const arr = ref.current.map((input: any) => input?.value)
           
        const response =  await addProduct({ title: arr[0], price: parseInt(arr[1]), description: arr[2],  imageLink: arr[3] })
        if(response?.status === 200) {
           alert(response.data.msg);
        navigate('../seller/viewproduct')
           return
        }
        if(response?.status === 401) {
            navigate('../../signin')
            return
        } else if(response?.status === 400){
            alert(response?.data.error.issues[0].message);
            return
        }
    }
    
    const render = addProductInputRef.map((val, index) => (
        <div className={''}>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            // @ts-ignore
            typeOfIn={val.types}
            placeHolder={val.placeHolder}
            />
        </div>
    ))

    return (
        
        <div className={"h-screen -translate-y-12 grid grid-cols-10"}>
        <div className={"flex flex-col justify-center items-center gap-5 col-span-12 md:col-span-6"}>
            <div className={"flex flex-col gap-5"}>
                {render}
            </div>
                <div className={"text-center"}>
                    <TextBlock variant={'sell'} size={"md"} text={'Submit'} textSize={'md'} onClick={submitAddProductForm}/>
                </div>
        </div>
        <div className={"col-span-3 hidden md:flex items-center justify-center"}>
            <img className={"min-w-40 w-96"} src={'/assets/image-3.png'} alt={'img'} />  
        </div>
    </div>
    )
}

export default AddProduct