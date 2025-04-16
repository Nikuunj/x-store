import { useRecoilValueLoadable } from "recoil";
import { userPurchaseIdListSelector } from "../store/fetchUserPurchase";
import UserSingleOrder from "../components/UserSingleOrder";
import UserSingleOrderDetail from "../components/UserSingleOrderDetail";
import { useNavigate } from "react-router";
import { memo, useEffect } from "react";


function UserViewOrder() {
    const val = useRecoilValueLoadable(userPurchaseIdListSelector);
    const navigate = useNavigate();

    useEffect(() => {
      if (val.state === "hasError") {
        const error = val.contents;
        console.error("Failed to load seller orders:", error);
        navigate("../../signin");
      }
    }, [val.state]);
  
  
    if (val.state === "loading") {
      return <div className={"flex justify-center items-center h-[80vh]"}>Loading...</div>
    }
  
    if (val.state === "hasError") {
      return <>Something went wrong!</>;
    }
  
    if(val.contents.length == 0) {
      return <div className={"flex justify-center items-center"}>No order place</div>
    }

    const renderProduct = val.contents.map((id: number | string) => (
    <div
        className={''}
        key={id}
    >
        <UserSingleOrder id={id.toString()} />
        <UserSingleOrderDetail id={id.toString()} />
    </div>
    ));

    return (
    <div className={'px-2 sm:px-10 flex flex-col gap-2 sm:gap-3'}
    >
      {renderProduct}
    </div>
    );
}

export default memo(UserViewOrder)