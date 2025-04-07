import { useRef } from "react"
import InputBox from "../components/InputBox"
import { placeOrderInputRef } from "../util/util";
import TextBlock from "../components/TextBlock";
import BigImage from "../components/BigImage";
// import { useParams } from 'react-router'

function PlaceOrder() {
    
    const ref = useRef<any>(Array(placeOrderInputRef.length).fill(0));

    function submitFrom() {
        const arr = ref.current.map((input: any) => input?.value);
        console.log(arr)
    }

    const render = placeOrderInputRef.map((val, index) => (
        <div className={'col-span-12 md:col-span-6'}>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            // @ts-ignore
            typeOfIn={val.types}
            placeHolder={val.placeHolder}
            />
        </div>
    ))
    return (
        <div className={"my-4 outline-1 rounded-lg outline-zinc-500 flex justify-center py-6 mx-52 shadow-indigo-700 hover:shadow-emerald-600 shadow-3xl/50 flex-col items-center "}>
            <div className={'flex flex-col md:flex-row items-center  gap-3 md:gap-8'}>                
                <BigImage urlImage={'src/assets/t-shirt.png'} title={'Image'} />
                <div className={" grid grid-cols-12 min-w-72 gap-1 mt-2 pr-8"}>
                    <div className={'col-span-12'}>
                        <TextBlock variant={'default'} size={"md"} textSize={'lg'} text={'Title'} />
                    </div>
                    <div className={'col-span-7'}>
                        <TextBlock variant={'default'} size={"md"} text={'Seller'} textSize={'md'}/>
                    </div>
                    <div className={'col-span-7'}>

                        <TextBlock variant={'default'} size={"md"} text={'Price'} textSize={'md'}/>
                    </div>
                    <div className={'col-span-12'}>

                        <TextBlock variant={'default'} size={"md"} text={'Detail'} textSize={'md'}/>
                    </div>
                </div>
                </div>
                
                <div className={"grid grid-cols-12  gap-5 my-5 text-md"}>
                    {render}
                </div>
            <div className={''}>
                
                <TextBlock variant={'sell'} size={"md"} text={'Submit'} textSize={'sm'} onClick={submitFrom}/>
            </div>
        </div>
    )
}

export default PlaceOrder