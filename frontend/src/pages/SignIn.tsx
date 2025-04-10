import { memo, useRef } from "react";
import InputBox from "../components/InputBox";
import TextBlock from "../components/TextBlock";
import ToggleButtonComponent from "../components/ToggleButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toggleAtom } from "../store/toggleButton";
import { signInSubmitFormSeller, signInSubmitFormUser } from "../util/submitForm";
import { userNameState } from "../store/userInfo";


function SignIn() {
    const ref = useRef<any>(Array(2).fill(0));
    const toggleData = useRecoilValue(toggleAtom);
    const setUserName = useSetRecoilState(userNameState);

    async function sellerSubmitForm() {
        const arr = ref.current.map((input: any) => input?.value);
        
        // const response = await signInSubmitFormSeller({ name: arr[0] , email: arr[1] , password: arr[0] })
        // if(response?.status === 400) {

        console.log('click');
        
        // } else {
            localStorage.setItem('auther', 'seller')
            localStorage.setItem('autherName', 'sellerName')
            setUserName('sellerName')
        // }
    }

    async function userSubmitForm() {
        // const arr = ref.current.map((input: any) => input?.value);
        // const response = await signInSubmitFormUser({ name: arr[0] , email: arr[1] , password: arr[0] })
        // if(response?.status === 400) {
            console.log('click');
        
        // } else {
            localStorage.setItem('auther', 'user')
            localStorage.setItem('autherName', 'userName')
            setUserName('userName')
        // }
    }

    // @ts-ignore
    const render = Array(2).fill(1).map((val, index) => (
        <div className={''}>
            <InputBox refrence={(e) => ref.current[index] = e} key={index}
            typeOfIn={'text'}
            placeHolder={"placeHolder"}
            />
        </div>
    ))

  return (
    <div className={"h-screen -translate-y-12 grid grid-cols-10"}>
        <div className={"flex flex-col justify-center items-center gap-5 col-span-12 md:col-span-6"}>
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
        <div className={"col-span-3 hidden md:flex items-center justify-center"}>
            <img className={"min-w-40 w-96"} src={'src/assets/image-2.png'} alt={'img'} />  
        </div>
    </div>
  )
}

export default memo(SignIn)