import { memo } from "react"
import { Link } from 'react-router-dom'

function LandingPage() {


  return (
    <div className={"flex justify-center h-[70vh]"}>
      <div className={"hidden lg:flex fixed left-22 top-1 rotate-90 mt-27 items-center"}>
        <img className={"min-w-40 w-93  opacity-55 hover:opacity-60 active:opacity-60 duration-300 transition-all"} src={'assets/hero.png'} alt={'img'} />
      </div>
      <div className={"flex flex-col items-center justify-center   sm:relative -top-15 z-20"}>
        <div className={"flex flex-col items-center"}>
          <span className={" duration-300 transition-all tracking-tight bg-gradient-to-t ps-3 md:ps-0 from-zinc-800 from-20%  via-zinc-800 via-25% to-purple-600 to-65% inline-block text-transparent bg-clip-text text-7xl sm:text-8xl/tight font-extrabold text-shadow-stone-500"}>X-Store</span>
          <div className={"sm:relative sm:-bottom-20 duration-300 transition-all"}>


            <div className={"flex flex-col  items-center font-[100] text-zinc-300 justify-center text-lg/5 sm:text-3xl/5 duration-300 transition-all"}>
              <div className={"text-base sm:text-2xl italic tracking-tighter transition-all duration-500 hover:text-zinc-400/80 hover:not-italic"}>
                Our doors are closing,
              </div>
              <div className={" tracking-normal hover:text-zinc-400/80 transition-all duration-500 hover:italic"}>
                but the memories last forever.
              </div>
            </div>
          </div>
          <Link to={'/product'} className={" sm:relative -bottom-58 mt-4.5"}>
            <span className={"py-1.5 outline-1 hover:bg-emerald-700/70 active:bg-emerald-700/70 outline-emerald-700/70 px-3.5 cursor-pointer hover:text-slate-300 transition-all duration-300"}>
              Explore Now
            </span>
          </Link>
        </div>
      </div>
      <div className={""}>

        <div className={"flex fixed -right-50 top-25 z-10  sm:right-20 sm:top-1 transition-all duration-300 -rotate-45  sm:-rotate-90 mt-27 items-center"}>
          <img className={"min-w-40 w-93  hover:opacity-60 active:opacity-60 duration-300 transition-all opacity-35  sm:opacity-55"} src={'assets/hero.png'} alt={'img'} />
        </div>
      </div>

    </div>
  )
}

export default memo(LandingPage)