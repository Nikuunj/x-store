import { useRecoilState } from "recoil";
import { submitAtom } from "../store/openCloseState";
import TextBlock from "./TextBlock";

interface SubmitCheckerProps {
    hadleSubmit?: () => void;
    text: string;
    btntext: string
}

function SubmitChecker( { hadleSubmit, text, btntext } : SubmitCheckerProps) {
    const [open, setOpen] = useRecoilState(submitAtom);

    function handleClose() {
        setOpen(false)
    }
    return (
        <>
            {open && <div className={"fixed inset-0 bg-[#050505cc] flex items-center justify-center z-50"}
                        onClick={handleClose}>
                    <div className={"bg-zinc-900  p-10 gap-4 flex-col flex rounded-lg text-zinc-400"} onClick={(e) => e.stopPropagation()}>
                        {text}
                        <div className="flex justify-center gap-5">
                            <TextBlock onClick={handleClose} variant={'denger'} size={'md'} textSize={'md'} text={'Close'} />
                            <TextBlock onClick={hadleSubmit ? hadleSubmit : handleClose} variant={'sell'} size={'md'} textSize={'md'} text={btntext} />
                        </div>
                    </div>
            </div>}
        </>
    )
}

export default SubmitChecker