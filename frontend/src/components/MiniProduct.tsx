
import { useSetRecoilState } from 'recoil'
import TextBlock, { TextBlockProps } from './TextBlock'
import { elementOpenStateFamily } from '../store/oepnCloseState'
import { MiniProductProps } from '../types/productType'
import React from 'react'


function MiniProduct({ id } : { id: string }) {
    const setOpen = useSetRecoilState(elementOpenStateFamily(id))
    const DetailsCollection: TextBlockProps[] = [{
            variant: 'default',
            text: 'Product Title'
        },
        {
            variant: 'default',
            text: 6999
        },
        {
            variant: 'default',
            text: '!00x'
        }
    ]

    const handleOpen = () => {
        setOpen(true)
    }
    const DetailRender = DetailsCollection.map((val, index) => <TextBlock key={index} variant={val.variant} text={val.text} />)
    return (
        <div className="w-72 lg:w-96 flex flex-col lg:flex-row items-center tracking-wider gap-2  text-zinc-300 
                transition-all duration-300  outline-1 rounded-lg outline-zinc-500
                shadow-3xl/50 -transf shadow-indigo-700 hover:shadow-emerald-600">
                    <div className="bg-zinc-900 w-full lg:w-auto py-2 lg:py-0 flex justify-center">
                        <img className="h-60 min-w-40 rounded-md lg:rounded-s-lg" src={'src/assets/t-shirt.png'} alt={'image'} />  
                    </div> 
                    <div className="lg:pl-2 pb-2 lg:pb-0 flex flex-col  gap-1">
                        {DetailRender}
                        <TextBlock variant={"detail"} text={'More Details'} onClick={handleOpen} />
                        <TextBlock variant={"sell"} text={'Buy'} />
                    </div>
        </div>
    )
}

export default React.memo(MiniProduct);
