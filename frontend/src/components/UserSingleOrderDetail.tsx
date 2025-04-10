import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { userOrderOpenAtomFamily } from "../store/oepnCloseState";
import { userPurchaseSelectorFamily } from "../store/fetchUserPurchase";


function UserSingleOrderDetail({ id }: { id: string }) {
    const [open, setOpen] = useRecoilState(userOrderOpenAtomFamily(id));
    const data = useRecoilValueLoadable(userPurchaseSelectorFamily(id));
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
            {open && <div className={" fixed h-screen inset-0 bg-[#050505cc] flex items-center justify-center z-50"}
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

export default UserSingleOrderDetail