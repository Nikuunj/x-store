import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import Logo from "./Logo"
import NavComponent from "./NavComponent"
import TextBlock from "./TextBlock"
import { userNameState } from "../store/userInfo"
import { memo } from "react"
import { Link, useNavigate } from 'react-router'
import { signOutState } from "../store/oepnCloseState"

function Navbar() {

  const userName = useRecoilValue(userNameState)
  
  return (
    <div className={"flex justify-between md:px-10 z-30 h-14 items-center text-slate-300  bg-zinc-900/75 fixed top-0 w-screen "}>
        <Logo />
        <div className={"flex justify-center items-center gap-1"}>
          <UserInfo userName={userName}/>
          <NavComponent />
        </div>
    </div>
  )
}

function UserInfo({userName} : { userName: string}) {

  

  const LoginSignUp = () => (
    <>
      <Link to={'signin'}>
        <TextBlock variant={'signin'} size={"sm"} text={'Login'} textSize={"sm"} />
      </Link>
      <Link to={'signup'}>
        <TextBlock variant={'detail'} size={"sm"} text={'Join'} textSize={"sm"} />
      </Link>
    </>
  )
   
 
  return (
    <div className={"flex gap-1"}>
      {localStorage.getItem('auther') ? <UserName userName={userName}/> : <LoginSignUp /> }  
    </div>
  )
}

const UserName = ({userName} : { userName: string} ) => {
  const [open, setOpen] = useRecoilState(signOutState);
  const setUserName = useSetRecoilState(userNameState)
  const navigate = useNavigate();

  function handleOpenClose() {
    setOpen(pre => !pre)
    console.log(open)
  }
  
  function signOutHandle() {
    localStorage.removeItem('auther')
    localStorage.removeItem('autherName')
    setOpen(false)
    setUserName('');
    navigate('');
  }
  return (
  <>
  
    <div onClick={handleOpenClose} className="z-30 transition-all duration-300 bg-indigo-600/60 text-center text-shadow-amber-700
     font-extrabold rounded-full px-4 py-2">
      {userName.charAt(0).toUpperCase()}
    </div>
    <div 
      className={`
        transition-all duration-300 fixed -translate-x-10 w-28 bg-zinc-800/70 hover:bg-zinc-700/75 text-center rounded-lg
        ${open ? "translate-y-12 " : " -translate-y-52"} `}
      onClick={signOutHandle}
    >
      Sign Out
    </div>
  </>)
}

export default memo(Navbar)