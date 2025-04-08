import { RecoilRoot } from "recoil"
import UserViewOrder from "./pages/UserViewOrder"


function App() {
  
  return (
    <div className="cursor-default overflow-y-auto tracking-wider font-mono bg-[url(src/assets/star.svg)] bg-zinc-200 dark:bg-zinc-950 transition-all duration-500 dark:text-zinc-100 h-screen">
      <RecoilRoot>
        <UserViewOrder />
      </RecoilRoot>
    </div>
  )
}

export default App