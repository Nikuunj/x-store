import { RecoilRoot } from "recoil"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"


function App() {
  
  return (
    <div className=" cursor-default overflow-y-auto  font-mono dark:bg-black bg-zinc-100 transition-all duration-500 dark:text-zinc-100 h-screen">
      <RecoilRoot>
        <PlaceOrder />
      </RecoilRoot>
    </div>
  )
}

export default App