import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <div className="cursor-default bg-auto overflow-y-auto tracking-wider font-mono bg-[url(assets/star.svg)]
    bg-fixed bg-zinc-200  dark:bg-zinc-950 transition-all duration-500 dark:text-zinc-100 min-h-screen">
        <Navbar />
        <div className="flex-grow mt-20  bg-[url(assets/star.svg)] bg-fixed">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout