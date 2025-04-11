import { useRecoilValueLoadable } from "recoil";
import { userPurchaseIdListSelector } from "../store/fetchUserPurchase";
import UserSingleOrder from "../components/UserSingleOrder";
import UserSingleOrderDetail from "../components/UserSingleOrderDetail";
import { useNavigate } from "react-router";


function UserViewOrder() {
  const val = useRecoilValueLoadable(userPurchaseIdListSelector);
  const navigate = useNavigate();
  
    if (val.state === 'loading') {
      return <>Loading...</>;
    }
  
    if (val.state === 'hasError') {
      navigate('../../signin')
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

export default UserViewOrder