import { useRecoilState } from "recoil";
import { toggleAtom } from "../store/toggleButton";
import { memo } from "react"; 


type Toggle = 'seller' | 'user'
const ToggleButtonComponent = () => {
  const [toggle, setToggle] = useRecoilState(toggleAtom);

  const handleToggle = (types: Toggle) => {
    setToggle({
      seller: types === 'seller',
      user: types === 'user',
    });
  };

  const trueToggle = 'px-5 py-2 bg-indigo-800/60  inset-shadow-xs inset-shadow-zinc-950';
  const falseToggle = 'bg-zinc-400/40 px-5 py-2  inset-shadow-xs inset-shadow-indigo-600/70'

  const defaultStyle = 'cursor-pointer transition-all duration-300 outline-0'
  return (
    <div className="flex text-slate-300/75">
      
      <button
        onClick={() => handleToggle('user')}
        className={`${toggle.user ? trueToggle : falseToggle} ${defaultStyle} rounded-s-lg `}
      >
        User
      </button>

      <button
        onClick={() => handleToggle('seller')}
        className={`${toggle.seller ? trueToggle : falseToggle} ${defaultStyle} rounded-e-lg`}
      >
        Seller
      </button>
    </div>
  );
};
export default memo(ToggleButtonComponent);
