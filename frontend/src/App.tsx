import Product from "./components/Product"


function App() {

  return (
    <>
      <div className="grid md:grid-cols-9 grid-cols-1 gap-4 md:gap-0 md:px-20 font-mono pt-10 pl-4 dark:bg-black bg-zinc-100 transition-all duration-500 dark:text-zinc-100 h-screen">  
        <Product id={'1'}/>
        {/* <Product id={'2'} />
        <Product id={'3'}/>

        <Product id={'4'}/>
        <Product id={'5'}/>
        <Product id={'6'}/> */}
      </div>
    </>
  )
}

export default App