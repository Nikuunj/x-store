import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { sellerOrderEditAtomFamily, showDetailStateFamily } from '../store/openCloseState';
import User from '../icons/User';
import EditPen from '../icons/EditPen';
import MapPin from '../icons/MapPin';
import StatusIcon from '../icons/StatusIcon';
import Mail from '../icons/Mail';
import { purchasedProductSelectorFamily } from '../store/fetchOrderSeller';
import TruckIcon from '../icons/TruckIcon';

function SellerEditOrderDetail({ productId, purchaseId }: { productId: string, purchaseId: string}) {

    const data = useRecoilValueLoadable(purchasedProductSelectorFamily({productId, purchaseId}))
    const setOpenEdit = useSetRecoilState(sellerOrderEditAtomFamily(purchaseId));

    if (data.state === 'loading') {
        return (
            <>
                <div className={"flex justify-center items-center h-[80vh]"}>Loading...</div>
            </>
        )
    }
    
    if (data.state === 'hasError') {
        return  (
            <>
                Error
            </>
        )
    }

    function handleOpen() {
        setOpenEdit(true);
    }
    const purchase = data.contents;

    return (
        <>
            <div key={purchase._id} className={"text-justify wrap-anywhere overflow-y-auto"}>
                <p className={"font-semibold text-base md:text-lg mb-1 flex justify-between gap-2"}>
                    <div className={"flex gap-2"}>
                        <User/> {purchase.user.name} 
                    </div>
                    <div className={"cursor-pointer"} onClick={handleOpen}>
                        <EditPen/>
                    </div>
                </p>
                <p className={"font-semibold text-base md:text-lg mb-1 flex gap-2"}><Mail/> {purchase.user.email}</p>
                <p className={"font-semibold mb-1.5 flex gap-2"}><StatusIcon /> {purchase.status}</p>
                <p className={"font-semibold mb-1.5 flex gap-2"}><MapPin /> {purchase.where}</p>
                <ShowDetail detail={purchase.deliveryAddress} id={purchase._id}/>
                <hr />
            </div>
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
            <p className={`text-zinc-300 ${show ? '' : 'truncate'} flex gap-2`}>
            <TruckIcon/> {detail}
            </p>
            <div onClick={handleShowdetail} className="z-50 px-3 py-2 inline-block -translate-x-3 text-blue-400 cursor-pointer underline">
                {show ? 'show less' : 'show more'}
            </div>
        </>
    )
}

export default SellerEditOrderDetail