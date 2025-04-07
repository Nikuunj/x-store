import { useRecoilState } from "recoil";
import { submitAtom } from "../store/oepnCloseState";
import TextBlock from "./TextBlock";

interface SubmitCheckerProps {
    hadleSubmit: () => void;
}

function SubmitChecker( { hadleSubmit } : SubmitCheckerProps) {
    const [open, setOpen] = useRecoilState(submitAtom);

    function handleClose() {
        console.log('close')
        setOpen(false)
    }
    return (
        <>
            {open && <div className={"absolute inset-0 h-screen w-screen bg-[#050505cc] flex items-center justify-center z-50"}
                        onClick={handleClose}>
                    <div className={"bg-zinc-900  p-10 gap-4 flex-col flex rounded-lg text-zinc-400"} onClick={(e) => e.stopPropagation()}>
                        Do You Want to Confim Your Order ?
                        <div className="flex justify-center gap-5">
                            <TextBlock onClick={handleClose} variant={'denger'} size={'md'} textSize={'md'} text={'Close'} />
                            <TextBlock onClick={hadleSubmit} variant={'sell'} size={'md'} textSize={'md'} text={'Submit'} />
                        </div>
                    </div>
            </div>}
        </>
    )
}

export default SubmitChecker