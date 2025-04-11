
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import TextBlock, { TextBlockProps } from './TextBlock'
import { productOpenStateFamily } from '../store/oepnCloseState'
import React from 'react'
import { Link } from 'react-router'
import { productSelectorFamily } from '../store/fetchProduct'


function MiniProduct({ id } : { id: string }) {
    const setOpen = useSetRecoilState(productOpenStateFamily(id))
    const data = useRecoilValueLoadable(productSelectorFamily(id));
    console.log(data.contents)


    if (data.state === 'loading') {
        return <>Loading...</>;
   }
   
   if (data.state === 'hasError') {
    return <>Error</>;
   }


    
    const DetailsCollection: TextBlockProps[] = [
        {
            variant: 'default',
            text: data.contents.title,
            size: 'sm',
            textSize: 'md'
        },
        {
            variant: 'default',
            text: data.contents.price,
            size: 'sm',
            textSize: 'sm'
        },
        {
            variant: 'default',
            text: 'Seller: ' + data.contents.sellerId.name,
            size: 'sm',
            textSize: 'sm'
        }
    ]

    const handleOpen = () => {
        setOpen(true)
    }
    const DetailRender = DetailsCollection.map((val, index) => <TextBlock key={index} size={val.size} textSize={val.textSize} variant={val.variant} text={val.text} />)
    return (
        <div className="w-72 lg:w-96 flex flex-col lg:flex-row items-center tracking-wider gap-2  text-zinc-300 
                transition-all duration-300  outline-1 rounded-lg outline-zinc-500
                shadow-3xl/50 shadow-indigo-700/95 hover:shadow-emerald-600/90">
                    <div className="bg-zinc-900/60 w-full lg:w-auto py-2 lg:py-0 flex justify-center">
                        <img className="h-60 min-w-40 rounded-md lg:rounded-s-lg" src={'/t-shirt.png'} alt={'image'} />  
                    </div> 
                    <div className="lg:pl-2 pb-2 lg:pb-0 flex flex-col  gap-1">
                        <div className='max-w-[150px] flex flex-col gap-1 text-ellipsis'>
                            {DetailRender}
                        </div>
                        <TextBlock variant={"detail"} size={'sm'} textSize={'sm'} text={'More Details'} onClick={handleOpen} />
                        <Link to={`../purchase/${id}`}>
                            <TextBlock variant={"sell"} size={'sm'} text={'Buy'} textSize={'sm'}/>
                        </Link>
                    </div>
        </div>
    )
}

export default React.memo(MiniProduct);