import { useRecoilValueLoadable } from "recoil";
import MiniProduct from "../components/MiniProduct";
import ProductDetail from "../components/ProductDetail";
import { userIdListSelector } from "../store/fetchProduct";

function Product() {
  const val = useRecoilValueLoadable(userIdListSelector);

  if (val.state === 'loading') {
    return <>Loading...</>;
  }

  if (val.state === 'hasError') {
    return <>Error</>;
  }

  
    const renderProduct = val.contents.map((id: number | string) => (
      <div
        className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4 flex items-center justify-center"
        key={id}
      >
        <MiniProduct id={id.toString()} />
        <ProductDetail id={id.toString()} />
      </div>
    ));

    return (
      <div className="grid grid-cols-12 sm:gap-10 gap-y-6 py-2 lg:mx-0">
        {renderProduct}
      </div>
    );

//   return null;
}

export default Product;
