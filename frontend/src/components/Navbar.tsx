import { useRecoilState, useRecoilValue } from "recoil"
import Logo from "./Logo"
import NavComponent from "./NavComponent"
import TextBlock from "./TextBlock"
import { userNameState } from "../store/userInfo"
import { memo, useRef } from "react"
import { signOutState } from "../store/oepnCloseState"

function Navbar() {

  
  return (
    <div className={"flex justify-between md:px-10 z-30 h-14 items-center text-slate-300  bg-zinc-900/75 fixed top-0 w-screen "}>
        <Logo />
        <div className={"flex justify-center items-center gap-1"}>
          <UserInfo />
          <NavComponent />
        </div>
    </div>
  )
}

function UserInfo() {

  
  

  const LoginSignUp = () => (
    <>
      <TextBlock variant={'signin'} size={"sm"} text={'Login'} textSize={"sm"} />
      <TextBlock variant={'detail'} size={"sm"} text={'Join'} textSize={"sm"} />
    </>
  )
   
 
  return (
    <div className={"flex gap-1"}>
      {localStorage.getItem('auther') ? <UserName /> : <LoginSignUp /> }  
    </div>
  )
}

const UserName = () => {
  const [open, setOpen] = useRecoilState(signOutState);
  const userName = useRecoilValue(userNameState)

  function handleOpenClose() {
    setOpen(pre => !pre)
    console.log(open)
  }
  
  return (
  <>
  
    <div onClick={handleOpenClose} className="z-30 transition-all duration-300 bg-indigo-600/60 text-center text-shadow-amber-700
     font-extrabold rounded-full px-3 py-1">
      {userName.charAt(0).toUpperCase()}
    </div>
    <div 
      className={`
        transition-all duration-300 fixed -translate-x-5 w-28 bg-zinc-800/70 hover:bg-zinc-700/75 text-center rounded-lg
        ${open ? "translate-y-12 " : " -translate-y-52"} `}
    >
      Sign Out
    </div>
  </>)
}

export default memo(Navbar)