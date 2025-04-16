import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { sellerOrderEditAtomFamily } from "../store/openCloseState";
import { editProdcutInputRef } from "../util/util";
import InputBox from "./InputBox";
import { useRef } from "react";
import TextBlock from "./TextBlock";
import { purchasedProductSelectorFamily } from "../store/fetchOrderSeller";
import { editOrder } from "../util/submitForm";
import { useNavigate } from "react-router";

function SellerOrderEdit({ productId, purchaseId }: { productId: string, purchaseId: string}) {
    const [open , setEditOpen] = useRecoilState(sellerOrderEditAtomFamily(purchaseId));
    const data = useRecoilValueLoadable(purchasedProductSelectorFamily({productId, purchaseId}))
    const ref = useRef<any>(Array(editProdcutInputRef.length).fill(0));
    const navigate = useNavigate();


    
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


    const purchase = data.contents;
    
    function handleClose() {
        setEditOpen(false)
    }

    async function handleEdit() {
        const arr = ref.current.map((input: any) => input?.value);
        console.log(arr);

        const response =  await editOrder({ purchaseId, status: arr[0], where: arr[1] })

        if(response?.status === 200) {
            alert(response.data.msg)
            setEditOpen(false);
            return
        } else if(response?.status === 401) {
            alert(response.data.msg);
            setEditOpen(false);
            navigate('../../signin')
            return
        }
        setEditOpen(false);
        alert(response?.data.msg);
    }
    const render = editProdcutInputRef.map((val, index) => (
        <div className={''} key={productId}>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            // @ts-ignore
            typeOfIn={val.types}
            placeHolder={val.placeHolder}
            // @ts-ignore
            defaultVal={purchase[val.defaultVal]}
            />
        </div>
    ))
    return (
        <>
            { open && 
            <div className={"fixed inset-0 bg-[#050505cc] flex items-center justify-center z-50"}
            onClick={handleClose}>
                    <div className={"bg-zinc-900  p-10 gap-5 flex-col flex rounded-lg text-zinc-400"} onClick={(e) => e.stopPropagation()}>
                        {render}
                        <div className="flex justify-center gap-5">
                            <TextBlock onClick={handleClose} variant={'denger'} size={'md'} textSize={'md'} text={'Close'} />
                            <TextBlock onClick={handleEdit} variant={'sell'} size={'md'} textSize={'md'} text={"Edit"} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SellerOrderEdit