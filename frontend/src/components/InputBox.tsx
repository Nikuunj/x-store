
interface InputBoxProps {
    refrence: (instance: HTMLInputElement | null) => void;
    placeHolder: string;
    typeOfIn: "text" | "password" | "email" | "number";
    defaultVal?: string
}

function InputBox({ refrence, placeHolder, typeOfIn, defaultVal }: InputBoxProps) {
  return (
    <input type={typeOfIn} ref={refrence} className="invalid:text-rose-800 outline-1 outline-zinc-600
     invalid:outline-1 invalid:outline-rose-800 bg-gray-800/65 invalid:shadow-lg
      invalid:shadow-rose-800 shadow-lg shadow-indigo-800 
      focus:shadow-emerald-800 transition-all duration-500
       text-gray-400 px-4 py-3 min-w-72 rounded-md cursor-text" placeholder={placeHolder} defaultValue={defaultVal}/>
  )
}

export default InputBox