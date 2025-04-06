

import { RecoilRoot } from "recoil";
import MiniProduct from "./MiniProduct";
import { ProductProps } from "../types/productType";
import ProductDetail from "./ProductDetail";



function Product(props: ProductProps) {
    return (
        <div className="col-span-3 items-center flex justify-center">
            <RecoilRoot>
                <MiniProduct id={props.id}/>
                <ProductDetail id={props.id}/>
            </RecoilRoot>
        </div>
    );
}

export default Product;
