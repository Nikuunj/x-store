import { useRef } from "react"
import InputBox from "../components/InputBox"
import { placeOrderInputRef } from "../util/util";
// import { useParams } from 'react-router'

function PlaceOrder() {
    
    const ref = useRef<any>(Array(placeOrderInputRef.length).fill(0));

    function submitFrom() {
        const arr = ref.current.map((input: any) => input?.value);
        console.log(arr)
    }

    const render = placeOrderInputRef.map((val, index) => (
        <div>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            // @ts-ignore
            typeOfIn={val.types}
            placeHolder={val.placeHolder}
            />
        </div>
    ))
    return (
        <div className={"m-10"}>
            <div className={"gap-5 flex flex-col m-10"}>
                {render}
            </div>
            <button onClick={submitFrom}>click me</button>
        </div>
    )
}

export default PlaceOrder