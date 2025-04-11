import { useRecoilValueLoadable } from "recoil";
import { sellerOrderIdListSelector } from "../store/fetchOrderSeller";
import SellerSingleOrder from "../components/SellerSingleOrder";
import SellerSingleOrderDetail from "../components/SellerSingleOrderDetail";
import { useNavigate } from "react-router";

function SellerViewOrder() {
  const val = useRecoilValueLoadable(sellerOrderIdListSelector);
  const navigate = useNavigate();
    if (val.state === 'loading') {
      return <>Loading...</>;
    }
  
    if (val.state === 'hasError') {
      navigate('../../signin');
      return
    }
  
    const renderProduct = val.contents.map((id: number | string) => (
    <div
        className={''}
        key={id}
    >
        <SellerSingleOrder id={id.toString()} />
        <SellerSingleOrderDetail id={id.toString()} />
    </div>
    ));

    return (
    <div className={'sm:px-10 px-2 flex flex-col gap-2 sm:gap-3'}
    >
        {renderProduct}
    </div>
    );
}

export default SellerViewOrder