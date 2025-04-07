import Logo from "./Logo"
import NavComponent from "./NavComponent"

function Navbar() {
  return (
    <div className="flex justify-between md:px-10 z-30 h-14 items-center bg-zinc-500/30 fixed top-0 w-screen ">
        <Logo />
        <NavComponent />
    </div>
  )
}

export default Navbar