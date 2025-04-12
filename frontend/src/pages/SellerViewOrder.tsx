import { useRecoilValueLoadable } from "recoil";
import { sellerOrderIdListSelector } from "../store/fetchOrderSeller";
import SellerSingleOrder from "../components/SellerSingleOrder";
import SellerSingleOrderDetail from "../components/SellerSingleOrderDetail";
import { useNavigate } from "react-router";
import { memo, useEffect } from "react";

function SellerViewOrder() {
  const val = useRecoilValueLoadable(sellerOrderIdListSelector);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (val.state === "hasError") {
      const error = val.contents;
      console.error("Failed to load seller orders:", error);
      navigate("../../signin");
    }
  }, [val.state]);

  if (val.state === "loading") {
    return <>Loading...</>;
  }

  if (val.state === "hasError") {
    return <>Something went wrong!</>;
  }


  if(val.contents.length == 0) {
    return <div className={"flex justify-center items-center"}>No order recived</div>
  }
  const renderProduct = val.contents.map((id: number | string) => (
    <div className={""} key={id}>
      <SellerSingleOrder id={id.toString()} />
      <SellerSingleOrderDetail id={id.toString()} />
    </div>
  ));

  return (
    <div className={"sm:px-10 px-2 flex flex-col gap-2 sm:gap-3"}>
      {renderProduct}
    </div>
  );
}

export default memo(SellerViewOrder);
