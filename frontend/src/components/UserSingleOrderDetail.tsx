import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { showDetailState, userOrderOpenAtomFamily } from "../store/oepnCloseState";
import { userPurchaseSelectorFamily } from "../store/fetchUserPurchase";
import CloseIcon from "../icons/CloseIcon";
import BigImage from "./BigImage";
import { memo } from "react";
import MapPin from "../icons/MapPin";
import StatusIcon from "../icons/StatusIcon";


function UserSingleOrderDetail({ id }: { id: string }) {
    const [open, setOpen] = useRecoilState(userOrderOpenAtomFamily(id));
    const data = useRecoilValueLoadable(userPurchaseSelectorFamily(id));
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

    return (
        <>
            {open && (
                <div
                    className="fixed flex justify-center  py-2 inset-0 px-4 h-screen overflow-y-scroll scroll-smooth md:px-24 transition-all duration-300 bg-[#050505cc] z-30"
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
                        <div className={"flex justify-center items-center"}>
                            <BigImage urlImage={data.contents.productId.imageLink} title={data.contents.productId.imageLink} />
                        </div>
                        <div className={"text-justify wrap-anywhere overflow-y-auto"}>
                            <p className={"font-semibold text-base md:text-lg mb-1"}>{data.contents.productId.title}</p>
                            <p className={" mb-1"}>Sold by: {data.contents.productId.sellerId.name}</p>
                            <p className={"text-emerald-400 font-semibold mb-1.5"}>₹ {data.contents.productId.price}</p>
                            <p className={"font-semibold mb-1.5 flex gap-2"}><StatusIcon /> {data.contents.status}</p>
                            <p className={"font-semibold mb-1.5 flex gap-2"}><MapPin /> {data.contents.where}</p>
                            <ShowDetail detail={data.contents.productId.description}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


function ShowDetail({ detail }: { detail: string }) {
    const [show, setShow] = useRecoilState(showDetailState);

    function handleShowdetail() {
        setShow(pre => !pre);
    }
    return (
        <>
            <p className={`text-zinc-300 ${show ? '' : 'truncate'}`}>
                {detail}
            </p>
            <div onClick={handleShowdetail} className="z-50 px-3 py-2 inline-block -translate-x-3 text-blue-400 cursor-pointer underline">
                {show ? 'show less' : 'show more'}
            </div>
        </>
    )
}

export default memo(UserSingleOrderDetail)