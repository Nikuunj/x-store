import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { editAtom, sellerOwnOpenAtomFamily, showDetailState, submitAtom } from "../store/openCloseState";
import { sellerOwnProductSelectorFamily } from "../store/fetchSellerOwnProduct";
import { memo } from "react";
import CloseIcon from "../icons/CloseIcon";
import BigImage from "./BigImage";
import DeleteIcon from "../icons/DeleteIcon";
import EditPen from "../icons/EditPen";
import SubmitChecker from "./SubmitChecker";
import { deleteProduct } from "../util/submitForm";
import { useNavigate } from "react-router";
import EditProductDetail from "./EditProductDetail";


function SellerSingleOwnDetail({ id }: { id: string }) {
    const [open, setOpen] = useRecoilState(sellerOwnOpenAtomFamily(id));
    const navigate = useNavigate();
    const data = useRecoilValueLoadable(sellerOwnProductSelectorFamily(id));
    const setEditOpen = useSetRecoilState(editAtom);
    const setDeleteOpen = useSetRecoilState(submitAtom);
    const handleClose = () => {
        setOpen(false);
    }

    function openDeleteBox() {
        setDeleteOpen(true)
    }

    function openEditBox() {
        setEditOpen(true);
    }
    async function handleDelete() {
        
        const response = await deleteProduct({ productId: id });
        if(response?.status === 200) {
            alert(response.data.msg)
            setDeleteOpen(false)
            setOpen(false);
            return
        } else if(response?.status === 401) {
            navigate('../../signin');
            alert(response.data.msg)
            return
        } else if(response?.status === 404) {
            alert(response.data.msg)
            return
        }
        setDeleteOpen(false) 
        setOpen(false);
        alert(response?.data.msg)
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
                        <div className={"mb-1 flex justify-end gap-3"}>
                            <div onClick={openEditBox}>
                                <EditPen />
                            </div>
                            <div onClick={openDeleteBox}>
                                <DeleteIcon />
                            </div>
                        </div>
                        <div className={"flex justify-center items-center"}>
                            <BigImage urlImage={data.contents.imageLink} title={data.contents.imageLink} />
                        </div>
                        <div className={"text-justify wrap-anywhere overflow-y-auto"}>
                            <p className={"font-semibold text-base md:text-lg mb-1"}>{data.contents.title}</p>
                            <p className={"text-emerald-400 font-semibold mb-1"}>₹ {data.contents.price}</p>
                            <ShowDetail detail={data.contents.description}/>
                        </div>
                        <SubmitChecker hadleSubmit={handleDelete} text={"Do You Want to Delete Your Product ?"} btntext={'Delete'} />
                        <EditProductDetail btntext={'Edit'} productId={id} />
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

export default memo(SellerSingleOwnDetail)