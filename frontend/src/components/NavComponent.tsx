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
            
            <div
                className={`
                    md:flex gap-3 transition-all duration-300
                    md:bg-transparent md:relative md:w-auto
                    md:translate-y-0
                    absolute  top-14 md:top-0 left-0 w-full bg-zinc-900/75 backdrop-blur-md
                    flex-col md:flex-row
                    ${open ? "translate-y-0" : "-translate-y-52"} 
                `}
            >
                {["Home", "About", "Projects", "Contact"].map((item, index) => (
                    <div key={index} className="ps-4 py-2">
                        {item}
                    </div>
                ))}
            </div>
            <div className="md:hidden pe-2 cursor-pointer z-20" onClick={navController}>
                <BarIcon />
            </div>
        </>
    )
}

export default NavComponent