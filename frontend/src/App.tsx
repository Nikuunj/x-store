import { RecoilRoot } from "recoil"
import SignIn from "./pages/SignIn"


function App() {
  
  return (
    <div className="cursor-default overflow-y-auto tracking-wider font-mono bg-[url(src/assets/star.svg)] bg-zinc-200 dark:bg-zinc-950 transition-all duration-500 dark:text-zinc-100 h-screen">
      <RecoilRoot>
        <SignIn />
      </RecoilRoot>
    </div>
  )
}

export default App