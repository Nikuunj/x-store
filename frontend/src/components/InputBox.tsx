
interface InputBoxProps {
    refrence?: React.RefObject<HTMLInputElement>;
    placeHolder: string
    type: "text" | "password" | "email"
}

function InputBox({ refrence, placeHolder, type }: InputBoxProps) {
  return (
    <input type={type} ref={refrence} className=" invalid:text-rose-800 outline-0 
     invalid:outline-1 invalid:outline-rose-800 bg-gray-800 invalid:shadow-lg
      invalid:shadow-rose-800 shadow-lg/70 shadow-violet-900 
      focus:shadow-green-900 transition-all duration-500 tracking-wider
       text-gray-400 px-4 py-3 min-w-72 rounded-md" placeholder={placeHolder} />
  )
}

export default InputBox