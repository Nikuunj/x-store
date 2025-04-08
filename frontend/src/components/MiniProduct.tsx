
import { useSetRecoilState } from 'recoil'
import TextBlock, { TextBlockProps } from './TextBlock'
import { productOpenStateFamily } from '../store/oepnCloseState'
import React from 'react'


function MiniProduct({ id } : { id: string }) {
    const setOpen = useSetRecoilState(productOpenStateFamily(id))
    const DetailsCollection: TextBlockProps[] = [{
            variant: 'default',
            text: 'Product Title',
            size: 'sm',
            textSize: 'md'
        },
        {
            variant: 'default',
            text: 6999,
            size: 'sm',
            textSize: 'md'
        },
        {
            variant: 'default',
            text: '!00x',
            size: 'sm',
            textSize: 'md'
        }
    ]

    const handleOpen = () => {
        setOpen(true)
    }
    const DetailRender = DetailsCollection.map((val, index) => <TextBlock key={index} size={val.size} textSize={val.textSize} variant={val.variant} text={val.text} />)
    return (
        <div className="w-72 lg:w-96 flex flex-col lg:flex-row items-center tracking-wider gap-2  text-zinc-300 
                transition-all duration-300  outline-1 rounded-lg outline-zinc-500
                shadow-3xl/50 shadow-indigo-700 hover:shadow-emerald-600">
                    <div className="bg-zinc-900 w-full lg:w-auto py-2 lg:py-0 flex justify-center">
                        <img className="h-60 min-w-40 rounded-md lg:rounded-s-lg" src={'src/assets/t-shirt.png'} alt={'image'} />  
                    </div> 
                    <div className="lg:pl-2 pb-2 lg:pb-0 flex flex-col  gap-1">
                        {DetailRender}
                        <TextBlock variant={"detail"} size={'sm'} textSize={'md'} text={'More Details'} onClick={handleOpen} />
                        <TextBlock variant={"sell"} size={'sm'} text={'Buy'} textSize={'md'}/>
                    </div>
        </div>
    )
}

export default React.memo(MiniProduct);
