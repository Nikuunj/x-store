import { useRecoilValueLoadable } from "recoil";
import { sellerOrderIdListSelector } from "../store/fetchOrderSeller";
import SellerSingleOrder from "../components/SellerSingleOrder";
import SellerSingleOrderDetail from "../components/SellerSingleOrderDetail";

function SellerViewOrder() {
  const val = useRecoilValueLoadable(sellerOrderIdListSelector);
  
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
        <SellerSingleOrder id={id.toString()} />
        <SellerSingleOrderDetail id={id.toString()} />
    </div>
    ));

    return (
    <div className={'px-10 mt-2 flex flex-col gap-2 sm:gap-3'}
    >
        {renderProduct}
    </div>
    );
}

export default SellerViewOrder