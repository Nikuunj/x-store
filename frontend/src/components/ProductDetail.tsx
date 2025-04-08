import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { productOpenStateFamily } from "../store/oepnCloseState";
// import { ProductDetailProps } from "../types/productType";
import React from "react";
import BigImage from "./BigImage";
import { productSelectorFamily } from "../store/fetchProduct";


function ProductDetail({ id } : { id: string }) {
    

    const [open, setOpen] = useRecoilState(productOpenStateFamily(id));
    const data = useRecoilValueLoadable(productSelectorFamily(id));
    const handleClose = () => {
        setOpen(false);
    }

    if (data.state === 'loading') {
        return <>Loading...</>;
        }
    
        if (data.state === 'hasError') {
        return <>Error</>;
        }
    return (
        <>
            {open && <div className={"absolute inset-0 h-screen w-screen md:px-60 bg-[#050505cc] flex items-center justify-center z-50"}
                        onClick={handleClose}>
                    <div className={"bg-zinc-900  p-10 gap-4 min-w-72 flex-col flex rounded-lg text-zinc-400"} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center">
                        <BigImage urlImage={'src/assets/t-shirt.png'} title={'Image'} />
                        </div>
                        <div className={"text-start pl-5 overflow-hidden mt-4"}>
                            {JSON.stringify(data.contents)}
                        </div>
                    </div>
            </div>}
        </>
    )
}

export default React.memo(ProductDetail);