import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { sellerOrderOpenAtomFamily } from "../store/oepnCloseState";
import { sellerOrderSelectorFamily } from "../store/fetchOrderSeller";


function SellerSingleOrderDetail({ id }: { id: string }) {
    const [open, setOpen] = useRecoilState(sellerOrderOpenAtomFamily(id));
    const data = useRecoilValueLoadable(sellerOrderSelectorFamily(id));
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
            {open && <div className={"absolute inset-0 h-screen w-screen bg-[#050505cc] flex items-center justify-center z-50"}
                        onClick={handleClose}>
                     <div className={"bg-zinc-900  p-10 gap-4 flex-col flex rounded-lg text-zinc-400"} onClick={(e) => e.stopPropagation()}>
                        Do You Want to Confim Your Order ?
                        <div className="flex justify-center gap-5">
                        <div className={"text-start pl-5 mt-4"}>
                            {JSON.stringify(data.contents)}
                        </div>
                        </div>
                    </div>
            </div>}
        </>
    )
}

export default SellerSingleOrderDetail