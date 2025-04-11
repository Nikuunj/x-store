import { useRef } from "react";
import InputBox from "../components/InputBox";
import TextBlock from "../components/TextBlock";
import ToggleButtonComponent from "../components/ToggleButton";
import { signUpSubmitFormSeller , signUpSubmitFormUser} from "../util/submitForm";
import { toggleAtom } from "../store/toggleButton";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router";
import { signUpInputRef } from "../util/util";


function SignUp() {
    const ref = useRef<any>(Array(signUpInputRef.length).fill(0));
    const toggleData = useRecoilValue(toggleAtom);
    const navigate = useNavigate();


    async function sellerSubmitForm() {
        const arr = ref.current.map((input: any) => input?.value);
        console.log('seller')
        const response = await signUpSubmitFormSeller({ name: arr[0] , email: arr[1] , password: arr[0] })
        console.log(response)
        if(response?.status === 200) {
            navigate('../signin')
        } else if(response?.status === 400){
            alert(response?.data.error.issues[0].message);
        }
    }

    async function userSubmitForm() {
        const arr = ref.current.map((input: any) => input?.value);
        console.log('user')
        const response = await signUpSubmitFormUser({ name: arr[0] , email: arr[1] , password: arr[0] })
        console.log(response);
        if(response?.status === 200) {
            navigate('../signin')
        } else if(response?.status === 400){
            alert(response?.data.error.issues[0].message);
        }
    }

    // @ts-ignore
    const render = signUpInputRef.map((val, index) => (
        <div className={''}>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            // @ts-ignore
            typeOfIn={val.types}
            placeHolder={val.placeHolder}
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
            <img className={"min-w-40 w-96"} src={'assets/image-1.png'} alt={'img'} />  
        </div>
    </div>
  )
}

export default SignUp