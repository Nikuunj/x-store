import { useRef } from "react";
import { addProductInputRef } from "../util/util";
import InputBox from "./InputBox";
import { editAtom } from "../store/openCloseState";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import TextBlock from "./TextBlock";
import { editProduct } from "../util/submitForm";
import { sellerOwnProductSelectorFamily } from "../store/fetchSellerOwnProduct";
import { useNavigate } from "react-router";

interface EditProuctProps {
    btntext: string;
    productId: string
}

function EditProductDetail({ btntext, productId }: EditProuctProps) {
    const [open, setOpen] = useRecoilState(editAtom);
    const ref = useRef<any>(Array(addProductInputRef.length).fill(0));
    const data = useRecoilValueLoadable(sellerOwnProductSelectorFamily(productId));
    const navigate = useNavigate()
    


    function handleClose() {
        setOpen(false)
    }

    async function handleEdit(){
        setOpen(false);
        const arr = ref.current.map((input: any) => input?.value);
        const response =  await editProduct({ productId, title: arr[0], price: parseInt(arr[1]), description: arr[2], imageLink: arr[3] })

        if(response?.status === 200) {
            alert(response.data.msg)
            setOpen(false);
            return
        } else if(response?.status === 401) {
            alert(response.data.msg);
            navigate('../../signin')
            setOpen(false);
            return
        }
        setOpen(false);
        alert(response?.data.msg);
    }

    if (data.state === 'loading') {
        return (
            <>
                {open && <div className={"flex justify-center items-center h-[80vh]"}>Loading...</div>}
            </>
        )
    }

    if (data.state === 'hasError') {
        return  (
            <>
                {open && <>Error</>}
            </>
        )
    }
    const render = addProductInputRef.map((val, index) => (
        <div className={''}>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            // @ts-ignore
            typeOfIn={val.types}
            placeHolder={val.placeHolder}
            // @ts-ignore
            defaultVal={data.contents[val.defaultVal]}
            />
        </div>
    ))


    return (
    <div>
        {open && 
        <div className={"fixed inset-0 bg-[#050505cc] flex items-center justify-center z-50"}
            onClick={handleClose}>
                <div className={"bg-zinc-900  p-10 gap-4 flex-col flex rounded-lg text-zinc-400"} onClick={(e) => e.stopPropagation()}>
                    {render}
                    <div className="flex justify-center gap-5">
                        <TextBlock onClick={handleClose} variant={'denger'} size={'md'} textSize={'md'} text={'Close'} />
                        <TextBlock onClick={handleEdit} variant={'sell'} size={'md'} textSize={'md'} text={btntext} />
                    </div>
                </div>
        </div>}
    </div>
    )
}

export default EditProductDetail