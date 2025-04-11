import { useRecoilState, useRecoilValueLoadable } from "recoil"
import { productOpenStateFamily, showDetailState } from "../store/oepnCloseState";
import BigImage from "./BigImage";
import { productSelectorFamily } from "../store/fetchProduct";
import CloseIcon from "../icons/CloseIcon";
import { memo } from "react"

function ProductDetail({ id }: { id: string }) {
    const [open, setOpen] = useRecoilState(productOpenStateFamily(id));
    const data = useRecoilValueLoadable(productSelectorFamily(id));

    const handleClose = () => {
        setOpen(false);
    };

    if (data.state === 'loading') return <>Loading...</>;
    if (data.state === 'hasError') return <>Error</>;

    const { title, description, price, sellerId } = data.contents;
    console.log(description)

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
                        <div className={"flex justify-center"}>
                            <BigImage urlImage={'/t-shirt.png'} title={'Image'} />
                        </div>
                        <div className={"text-justify wrap-anywhere overflow-y-auto"}>
                            <p className={"font-semibold text-base md:text-lg mb-1"}>{title}</p>
                            <p className={"text-zinc-400 mb-1"}>Sold by: {sellerId.name}</p>
                            <p className={"text-emerald-400 font-semibold mb-1"}>₹ {price}</p>
                            <ShowDetail detail={description}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
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

export default memo(ProductDetail);
