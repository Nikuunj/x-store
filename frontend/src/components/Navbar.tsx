import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Logo from "./Logo";
import NavComponent from "./NavComponent";
import TextBlock from "./TextBlock";
import { userNameState } from "../store/userInfo";
import { memo, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'; // ✅ fixed import
import { signOutState } from "../store/openCloseState";
import { signOutFunction, singInWithToken } from "../util/submitForm"; // ✅ make sure this is imported

function Navbar() {
  const userName = useRecoilValue(userNameState);
  const setUserName = useSetRecoilState(userNameState);

  useEffect(() => {
    const auther = localStorage.getItem("auther");
    const name = localStorage.getItem("autherName");

    if (auther && name) {
      singInWithToken(auther).then((isValid) => {
        if (isValid) {
          setUserName(name);
        } else {
          localStorage.removeItem("auther");
          localStorage.removeItem("autherName");
          setUserName('');
        }
      });
    }
  }, [setUserName]);

  return (
    <div className="flex justify-between md:px-10 z-30 h-14 items-center bg-zinc-900/75 fixed top-0 w-screen">
      <Logo />
      <div className="flex justify-center items-center gap-2">
        <UserInfo userName={userName} />
        <NavComponent />
      </div>
    </div>
  );
}

function UserInfo({ userName }: { userName: string }) {
  const isLoggedIn = !!localStorage.getItem("auther");

  return (
    <div className="flex gap-1">
      {isLoggedIn ? <UserName userName={userName} /> : <LoginSignUp />}
    </div>
  );
}

const LoginSignUp = () => (
  <>
    <Link to="signin">
      <TextBlock variant="signin" size="sm" text="Login" textSize="sm" />
    </Link>
    <Link to="signup">
      <TextBlock variant="detail" size="sm" text="Join" textSize="sm" />
    </Link>
  </>
);

const UserName = ({ userName }: { userName: string }) => {
  const [open, setOpen] = useRecoilState(signOutState);
  const setUserName = useSetRecoilState(userNameState);
  const navigate = useNavigate();

  function handleOpenClose() {
    setOpen((pre) => !pre);
  }

  async function signOutHandle() {
    const signedOut = await signOutFunction();
    if (signedOut) {
      localStorage.removeItem("auther");
      localStorage.removeItem("autherName");
      setOpen(false);
      setUserName("");
      navigate("/"); // ✅ go to homepage on sign out
    }
  }

  return (
    <>
      <div
        onClick={handleOpenClose}
        className="z-30 transition-all duration-300 bg-indigo-600/60 text-center font-extrabold rounded-full sm:px-3.5 sm:py-1.5 px-2.5 py-0.5  cursor-pointer"
      >
        {userName?.charAt(0).toUpperCase()}
      </div>
      <div
        className={`
          transition-all duration-300 fixed -translate-x-10 w-28 bg-zinc-800/70 hover:bg-zinc-700/75 active:bg-zinc-700/75 text-center rounded-lg
          ${open ? "translate-y-12" : "-translate-y-52"} cursor-pointer
        `}
        onClick={signOutHandle}
      >
        Sign Out
      </div>
    </>
  );
};

export default memo(Navbar);
