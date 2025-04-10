import { useRef } from "react";
import InputBox from "../components/InputBox";
import TextBlock from "../components/TextBlock";
import ToggleButtonComponent from "../components/ToggleButton";
import { signUpSubmitFormSeller , signUpSubmitFormUser} from "../util/submitForm";
import { toggleAtom } from "../store/toggleButton";
import { useRecoilValue } from "recoil";

function SignUp() {
    const ref = useRef<any>(Array(3).fill(0));
    const toggleData = useRecoilValue(toggleAtom);


    async function sellerSubmitForm() {
        const arr = ref.current.map((input: any) => input?.value);
        console.log('seller')
        const status = await signUpSubmitFormSeller({ name: arr[0] , email: arr[1] , password: arr[0] })
        console.log(status);
    }

    async function userSubmitForm() {
        const arr = ref.current.map((input: any) => input?.value);
        console.log('user')
        const status = await signUpSubmitFormUser({ name: arr[0] , email: arr[1] , password: arr[0] })
        console.log(status);
    }

    // @ts-ignore
    const render = Array(3).fill(1).map((val, index) => (
        <div className={''}>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            typeOfIn={'text'}
            placeHolder={"placeHolder"}
            />
        </div>
    ))

  return (
    <div className={"h-screen -translate-y-12 grid grid-cols-10"}>
        <div className={"flex flex-col justify-center items-center gap-5 col-span-12 md:col-span-6"} >
            <div className={"flex flex-col gap-5"}>
                {render}
            </div>

            <div className={'flex flex-col gap-5'}>
                <ToggleButtonComponent />
                <div className={"text-center"}>
                    <TextBlock variant={'sell'} size={"md"} text={'Submit'} textSize={'md'} onClick={toggleData.seller ? sellerSubmitForm :  userSubmitForm}/>
                </div>
            </div>
        </div>
        <div className={"col-span-3 hidden  md:flex items-center justify-center"}>
            <img className={"min-w-40 w-96"} src={'src/assets/image-1.png'} alt={'img'} />  
        </div>
    </div>
  )
}

export default SignUp