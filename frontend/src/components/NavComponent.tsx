import { useRecoilState } from "recoil"
import BarIcon from "../icons/BarIcon"
import { navBarAtom } from "../store/openCloseState"
import { LinkNav } from "../util/util";
import { Link } from "react-router";

function NavComponent() {
    const [open, setOpen] = useRecoilState(navBarAtom);

    const auther = localStorage.getItem('auther')

    function navController() {
        setOpen(pre => !pre);
    }

    const filteredLinks = LinkNav.filter(link => {
        if (!auther && (link.name === 'Home' || link.name === 'Shop')) return true;
        if (auther === 'user' && (link.name === 'Home' || link.name === 'Shop' || link.name === 'Order')) return true;
        if (auther === 'seller' && (link.name === 'Home' || link.name === 'Orders' || link.name === 'Add Product' || link.name === 'View Product')) return true;
        return false;
    });

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
                {filteredLinks.map((item, index) => (
                    <Link key={index}  to={item.to} className="cursor-pointer ">
                        <div className="ps-4 py-2">
                            {item.name}
                        </div>
                    </Link> 
                ))}
            </div>
            <div className="md:hidden pe-2 cursor-pointer z-20" onClick={navController}>
                <BarIcon />
            </div>
        </>
    )
}

export default NavComponent