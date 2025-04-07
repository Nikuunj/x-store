import { RecoilRoot } from "recoil"
import PlaceOrder from "./pages/PlaceOrder"


function App() {
  
  return (
    <div className=" cursor-default overflow-y-auto  font-mono bg-[url(src/assets/star.svg)] bg-zinc-200 dark:bg-zinc-950 transition-all duration-500 dark:text-zinc-100 h-screen">
      <RecoilRoot>
        <PlaceOrder />
      </RecoilRoot>
    </div>
  )
}

export default App