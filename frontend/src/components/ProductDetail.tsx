import { useRecoilState } from "recoil"
import { elementOpenStateFamily } from "../store/oepnCloseState";
import { ProductDetailProps } from "../types/productType";
import React from "react";


function ProductDetail({ id } : { id: string }) {
    

    const [open, setOpen] = useRecoilState(elementOpenStateFamily(id));
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
            {open && <div className="absolute inset-0 h-screen w-screen bg-[#050505cc] flex items-center justify-center z-50"
                        onClick={handleClose}>
                    <div className="bg-white text-black p-4 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <img className="min-w-40 w-72 rounded-lg" src={'src/assets/t-shirt.png'} alt={'image'} />  
                        </div>
                        <div className="text-start pl-5 mt-4">
                            <div>Title</div>
                            <div>Prive</div>
                            <div>Seller</div>
                            <div>Detail</div>
                            <div>Buy</div>
                        </div>
                    </div>
            </div>}
        </>
    )
}

export default React.memo(ProductDetail);