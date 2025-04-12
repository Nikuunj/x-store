import { memo } from 'react'
import RightArrow from '../icons/RightArrow'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { sellerOwnOpenAtomFamily } from '../store/openCloseState'
import { sellerOwnProductSelectorFamily } from '../store/fetchSellerOwnProduct'


function SellerSingleOwn( { id }: { id: string }) {
  const setOpen = useSetRecoilState(sellerOwnOpenAtomFamily(id))
  const data = useRecoilValueLoadable(sellerOwnProductSelectorFamily(id));
  
  const handleOpen = () => {
    setOpen(true)
  }
      
  if (data.state === 'loading') {
    return (
        <>
            Loading...
        </>
    )
  }

  if (data.state === 'hasError') {
      return  (
          <>
              Error
          </>
      )
  }

  return (
    <div className={"flex cursor-pointer gap-10 sm:text-lg text-sm items-center justify-between rounded-lg transition-all duration-300 bg-zinc-500/30 hover:bg-zinc-600/50 py-2 px-3 sm:px-4"}
    onClick={handleOpen}
    >
      <div className={"flex justify-center items-center gap-6"}>
        <div className={"rounded-lg inset-shadow-sm p-0 sm:p-2 inset-shadow-black/50"}>
          <img className={"w-15 rounded-lg"} src={data.contents.imageLink} alt={'title'} />  
        </div>
        <div className={'justify-end flex'}>
        {data.contents.title}
        </div>
      </div>
      <div className={'flex justify-center items-center gap-3 md:gap-10'}>
          <div className={'text-emerald-400 font-semibold'}>
          ₹ {data.contents.price}
          </div>
          <div className={'mt-1.5 md:mt-1'}>
            <RightArrow />
          </div>
      </div>
    </div>
  )
}

export default memo(SellerSingleOwn)