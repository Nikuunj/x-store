import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { sellerOrderOpenAtomFamily } from "../store/openCloseState";
import { sellerOrderSelectorFamily } from "../store/fetchOrderSeller";
import { memo } from "react";
import SellerEditOrderDetail from "./SellerEditOrderDetail";
import SellerOrderEdit from "./SellerOrderEdit";
import CloseIcon from "../icons/CloseIcon";


function SellerSingleOrderDetail({ id }: { id: string }) {
    const [open, setOpen] = useRecoilState(sellerOrderOpenAtomFamily(id));
    const data = useRecoilValueLoadable(sellerOrderSelectorFamily(id));
    const handleClose = () => {
        setOpen(false);
    }

 
    if (data.state === 'loading') {
        return (
            <>
                {open && <>Loding</>}
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
    const purchasedProduct = data.contents.purchasedProduct

    const renderOrder = purchasedProduct.map((purchase: any) => (
        <>
            <SellerEditOrderDetail productId={id} purchaseId={purchase._id}/>
            <SellerOrderEdit productId={id} purchaseId={purchase._id}/>
        </>
    ))
    
    
    return (
        <>
            {open && (
                <div
                    className="fixed flex justify-center py-2 inset-0 px-4 h-screen overflow-y-scroll scroll-smooth md:px-24 transition-all duration-300 bg-[#050505cc] z-30"
                    onClick={handleClose}
                >
                    <div    
                        className="fixed top-4 right-4 md:top-5 md:right-5 my-0 text-zinc-400 cursor-pointer"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </div>  
                    <div
                        className={"bg-zinc-900 h-max p-6 mx-0 my-auto md:px-10 py-3 min-w-72 w-full max-w-2xl rounded-lg"}
                        onClick={(e) => e.stopPropagation()}
                    >
                    <div className={"flex flex-col gap-3"}>
                       {renderOrder}
                    </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default memo(SellerSingleOrderDetail)