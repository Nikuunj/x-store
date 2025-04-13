import { useRef } from "react"
import InputBox from "../components/InputBox"
import { placeOrderInputRef } from "../util/util";
import TextBlock from "../components/TextBlock";
import BigImage from "../components/BigImage";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { submitAtom } from "../store/openCloseState";
import SubmitChecker from "../components/SubmitChecker";
import { useNavigate, useParams } from 'react-router'
import { purchaseOrderFormUser } from "../util/submitForm";
import { productSelectorFamily } from "../store/fetchProduct";

function PlaceOrder() {
    const navigate = useNavigate();
    const param = useParams();
    const ref = useRef<any>(Array(placeOrderInputRef.length).fill(0));
    const setOpen = useSetRecoilState(submitAtom)
    const productId = param.productId;


    if(!productId) {
        navigate('../../product')
        return <></>
    }
    
    const data = useRecoilValueLoadable(productSelectorFamily(productId));

    if (data.state === 'loading') {
        return <>Loading...</>;
    }
    
    if (data.state === 'hasError') {
        return <>Error</>;
    }

    function handleOpen() {
        setOpen(true)
    }
    async function submitFrom() {
        setOpen(false)
        const arr = ref.current.map((input: any) => input?.value?.trim()).filter(Boolean)
        const deliveyAddress = arr.join(' ');

        if(!deliveyAddress) {
            alert('Plz add address')
            return
        } else {
            if(!productId) {
                navigate('../../product')
                return
            }
            const response =  await purchaseOrderFormUser({ deliveyAddress, productId })
            if(response?.status === 200) {
                alert('Product purchased')
                navigate('../..')
            }
            if(response?.status === 401) {
                navigate('../../signin')
            } 
        }
    }

    const render = placeOrderInputRef.map((val, index) => (
        <div key={index} className={'col-span-12 md:col-span-6'}>
            <InputBox refrence={(e) => ref.current[index] = e} 
            // @ts-ignore
            typeOfIn={val.types}
            placeHolder={val.placeHolder}
            />
        </div>
    ))
    return (
        <div className="flex justify-center px-2">
            <div className={"my-4 outline-1 rounded-lg outline-zinc-500 flex justify-center flex-col items-center px-1 md:px-5 py-1 md:py-5 shadow-indigo-700 hover:shadow-emerald-600 active:shadow-emerald-600 shadow-3xl/50 "}>
                <div className={'flex flex-col sm:flex-row items-center  gap-3 md:gap-8'}>                
                    <BigImage urlImage={data.contents.imageLink} title={'Image'} />
                    <div className={" max-w-96 grid grid-cols-12 min-w-72 gap-1 mt-2 pr-8"}>
                        <div className={'col-span-12'}>
                            <TextBlock variant={'default'} size={"md"} textSize={'lg'} text={data.contents.title} />
                        </div>
                        <div className={'col-span-7'}>
                            <TextBlock variant={'default'} size={"md"} text={`₹ ${data.contents.price}`} textSize={'md'}/>
                        </div>
                        <div className={'col-span-7'}>
                            <TextBlock variant={'default'} size={"md"} text={data.contents.sellerId.name} textSize={'md'}/> 
                        </div>
                        <div className={'col-span-12'}>
                            <TextBlock variant={'default'} size={"md"} text={data.contents.description} textSize={'md'}/>
                        </div>
                    </div>
                    </div>
                    
                    <div className={"grid grid-cols-12  gap-5 my-5 text-md"}>
                        {render}
                    </div>
                <div className={''}>
                    <TextBlock variant={'sell'} size={"md"} text={'Submit'} textSize={'sm'} onClick={handleOpen}/>
                </div>

                <SubmitChecker hadleSubmit={submitFrom} text={"Do You Want to Confim Your Order ?"} />
            </div>
        </div>
    )
}

    export default PlaceOrder