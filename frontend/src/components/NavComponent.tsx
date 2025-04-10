import { useRecoilState } from "recoil"
import BarIcon from "../icons/BarIcon"
import { navBarAtom } from "../store/oepnCloseState"

function NavComponent() {
    const [open, setOpen] = useRecoilState(navBarAtom);

    function navController() {
        setOpen(pre => !pre);
    }
    return (
        <>
            <div className={`md:flex gap-3 transition-all duration-300 bg-zinc-800/40 md:bg-transparent  md:relative md:w-auto md:-translate-0 ${open ? 'w-full absolute translate-y-21' : ' -translate-y-21 w-full absolute' }`} >
                <div className="ps-4 py-0.5 ">
                    Home
                </div>
                <div className="ps-4 py-0.5">
                    Home
                </div>
                <div className="ps-4 py-0.5 ">
                    Home
                </div>
                <div className="ps-4 py-0.5">
                    Home
                </div>
            </div>
            <div className={"md:hidden pe-4"} onClick={navController}>
                <BarIcon />
            </div>
        </>
    )
}

export default NavComponent