import { RecoilRoot } from "recoil"
import Product from "./pages/Product"


function App() {
  
  return (
    <div className=" cursor-default overflow-y-auto md:px-24 font-mono dark:bg-black bg-zinc-100 transition-all duration-500 dark:text-zinc-100 h-screen">
      <RecoilRoot>
      
        <Product />
      </RecoilRoot>  
    </div>
  )
}

export default App