import { useNavigate } from "react-router";
import { useRecoilValueLoadable } from "recoil";
import { sellerOwnProductIdListSelector } from "../store/fetchSellerOwnProduct";
import { useEffect } from "react";
import SellerSingleOwnProduct from "../components/SellerSingleOwnProduct";
import SellerSingleOwnProductDetail from "../components/SellerSingleOwnProductDetail";
// import SellerSingleOwnProduct from "../components/SellerSingleOwnProduct";

function SellerOwnProduct() {
  const val = useRecoilValueLoadable(sellerOwnProductIdListSelector);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (val.state === "hasError") {
      const error = val.contents;
      console.error("Failed to load seller orders:", error);
      navigate("../../signin");
    }
  }, [val.state]);

  if (val.state === 'loading') {
    return <>Loading...</>;
  }

  if (val.state === "hasError") {
    return <>Something went wrong!</>;
  }
  
  if(val.contents.length == 0) {
    return <div className={"flex justify-center items-center"}>no Product</div>
  }
  const renderProduct = val.contents.map((id: number | string) => (
  <div
      className={''}
      key={id}
  >
      <SellerSingleOwnProduct id={id.toString()} />
      <SellerSingleOwnProductDetail id={id.toString()} />
  </div>
  ));

  return (
    <div className={'px-2 sm:px-10 flex flex-col gap-2 sm:gap-3'}
    >
      {renderProduct}
    </div>
  );
}

export default SellerOwnProduct