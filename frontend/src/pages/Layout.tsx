import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

function Layout() {
  return (
    <div className="cursor-default scroll-smooth bg-auto overflow-y-auto tracking-wider font-mono bg-[url(assets/star.svg)]
    bg-fixed bg-zinc-200 text-slate-300 dark:bg-zinc-950 transition-all duration-500 min-h-screen">
        <Navbar />
        <div className="mt-20 scroll-smooth  bg-[url(assets/star.svg)] bg-fixed">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout