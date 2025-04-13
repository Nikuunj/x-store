import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { sellerOrderOpenAtomFamily, showDetailStateFamily } from "../store/openCloseState";
import { sellerOrderSelectorFamily } from "../store/fetchOrderSeller";
import { memo } from "react";
import MapPin from "../icons/MapPin";
import StatusIcon from "../icons/StatusIcon";
import CloseIcon from "../icons/CloseIcon";
import User from "../icons/User";
import Mail from "../icons/Mail";
import TruckIcon from "../icons/TruckIcon";
import EditPen from "../icons/EditPen";


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

    // console.log(data.contents);
    const purchasedProduct = data.contents.purchasedProduct
    console.log(purchasedProduct);


    const renderOrder = purchasedProduct.map((purchase: any) => (
        <div key={purchase._id} className={"text-justify wrap-anywhere overflow-y-auto"}>
            <p className={"font-semibold text-base md:text-lg mb-1 flex justify-between gap-2"}>
                <div className={"flex gap-2"}>
                    <User/> {purchase.user.name} 
                </div>
                <div className={"cursor-pointer"}>
                    <EditPen/>
                </div>
            </p>
            <p className={"font-semibold text-base md:text-lg mb-1 flex gap-2"}><Mail/> {purchase.user.email}</p>
            <p className={"font-semibold mb-1.5 flex gap-2"}><StatusIcon /> {purchase.status}</p>
            <p className={"font-semibold mb-1.5 flex gap-2"}><MapPin /> {purchase.where}</p>
            <ShowDetail detail={purchase.deliveryAddress} id={purchase._id}/>
            <hr />
        </div>
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


function ShowDetail({ detail, id }: { detail: string, id: string }) {
    const [show, setShow] = useRecoilState(showDetailStateFamily(id));

    function handleShowdetail() {
        setShow(pre => !pre);
    }
    return (
        <>
            <p className={`text-zinc-300 ${show ? '' : 'truncate'} flex gap-2 -translate-x-2.5`}>
            <TruckIcon/> {detail}
            </p>
            <div onClick={handleShowdetail} className="z-50 px-3 py-2 inline-block -translate-x-3 text-blue-400 cursor-pointer underline">
                {show ? 'show less' : 'show more'}
            </div>
        </>
    )
}
export default memo(SellerSingleOrderDetail)