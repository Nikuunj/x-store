import ThemeButton from "./components/ThemeButton"

function App() {


  return (
    <>
    <div className="dark:bg-black bg-zinc-100 transition-all duration-500 dark:text-zinc-100 h-screen">  
      <ThemeButton />
      hi there
    </div>
    </>
  )
}

export default App