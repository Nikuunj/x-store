
import { useSetRecoilState } from 'recoil'
import TextBlock, { TextBlockProps } from './TextBlock'
import { elementOpenStateFamily } from '../store/oepnCloseState'
import { MiniProductProps } from '../types/productType'


function MiniProduct(props: MiniProductProps) {
    const setOpen = useSetRecoilState(elementOpenStateFamily(props.id))
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
        <div className="w-96 flex flex-col md:flex-row min-w-72 items-center tracking-wider gap-2  text-zinc-300 
                transition-all duration-300  outline-1 rounded-xl outline-zinc-500
                shadow-3xl/50 -transf shadow-indigo-700 hover:shadow-emerald-600">
                    <div className="bg-zinc-900">
                        <img className="h-60 min-w-40 rounded-s-xl" src={'src/assets/t-shirt.png'} alt={'image'} />  
                    </div> 
                    <div className="pl-2 flex flex-col  gap-1">
                        {DetailRender}
                        <TextBlock variant={"detail"} text={'More Details'} onClick={handleOpen} />
                        <TextBlock variant={"sell"} text={'Buy'} />
                    </div>
        </div>
    )
}

export default MiniProduct