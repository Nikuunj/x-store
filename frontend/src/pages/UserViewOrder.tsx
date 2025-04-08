import { useRecoilValueLoadable } from "recoil";
import { userPurchaseIdListSelector } from "../store/fetchUserPurchase";
import UserSingleOrder from "../components/UserSingleOrder";
import UserSingleOrderDetail from "../components/UserSingleOrderDetail";


function UserViewOrder() {
  const val = useRecoilValueLoadable(userPurchaseIdListSelector);
  
    if (val.state === 'loading') {
      return <>Loading...</>;
    }
  
    if (val.state === 'hasError') {
      return <>Error</>;
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
    <div className={'px-10 mt-2 flex flex-col gap-2 sm:gap-3'}
    >
      {renderProduct}
    </div>
    );
}

export default UserViewOrder