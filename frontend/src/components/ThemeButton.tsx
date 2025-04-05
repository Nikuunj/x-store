
import { useState } from "react";
import MoonIcon from "../icons/MoonIcon";
import LightIcon from "../icons/LightIcon";

function ThemeButton() {
    const [isChecked, setIsChecked] = useState(false);

    const toggleTheme = () => {
      const html = document.querySelector('html');
      if (html) {
        html.classList.toggle('dark');
        setIsChecked(!isChecked)
      }
    }
  

  return (
    <label className="inline-flex items-center me-5 cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={isChecked}
      onChange={toggleTheme}
    />
    <div className="relative w-11 h-6 shadow-xl dark:shadow-zinc-600 dark:shadow-lg/90  shadow-gray-700/50 bg-gray-300 rounded-full dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
      after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
      after:bg-zinc-700 dark:after:bg-bg-gray-200  after:rounded-full after:h-5 after:w-5 after:transition-all">
    </div>

    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-400">
      {isChecked ? <LightIcon /> : <MoonIcon />}
    </span>
  </label>
  )
}

export default ThemeButton