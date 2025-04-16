import { memo } from 'react'
import RightArrow from '../icons/RightArrow'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { sellerOrderOpenAtomFamily } from '../store/openCloseState'
import { sellerOrderSelectorFamily } from '../store/fetchOrderSeller'
import Notification from '../icons/Notification'


function SellerSingleOrder( { id }: { id: string }) {
  const setOpen = useSetRecoilState(sellerOrderOpenAtomFamily(id))
  const data = useRecoilValueLoadable(sellerOrderSelectorFamily(id));
  
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
    <div className={"flex gap-10 items-center cursor-pointer sm:text-lg text-sm justify-between rounded-lg transition-all duration-300 bg-zinc-500/30 hover:bg-zinc-600/50 active:bg-zinc-600/50 py-2 px-3 sm:px-4"}
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
          <div className={'flex gap-2 text-zinc-400'}>
           <Notification /> {data.contents.purchasedProduct.length}
          </div>
          <div className='mt-1.5 md:mt-1'>
            <RightArrow />
          </div>
      </div>
    </div>
  )
}

export default memo(SellerSingleOrder)