import { memo } from 'react'
import RightArrow from '../icons/RightArrow'
import { useSetRecoilState } from 'recoil'
import { userOrderOpenAtomFamily } from '../store/oepnCloseState'


function UserSingleOrder( { id }: { id: string }) {
  const setOpen = useSetRecoilState(userOrderOpenAtomFamily(id))
  
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className={"flex gap-10 items-center justify-between text-xl rounded-lg transition-all duration-300 bg-zinc-500/30 hover:bg-zinc-600/50 py-2 px-3 sm:px-4"}
    onClick={handleOpen}
    >
      <div className={"flex justify-center items-center gap-6"}>
        <div className={"rounded-lg inset-shadow-sm p-0 sm:p-2 inset-shadow-zinc-700"}>
          <img className={"w-15 rounded-lg"} src={'src/assets/t-shirt.png'} alt={'title'} />  
        </div>
        <div className={'justify-end flex'}>
          name
        </div>
      </div>
      <div className={'flex justify-center items-center gap-3 md:gap-10'}>
          <div>
            price
          </div>
          <div className='mt-1.5 md:mt-1'>
            <RightArrow />
          </div>
      </div>
    </div>
  )
}

export default memo(UserSingleOrder)