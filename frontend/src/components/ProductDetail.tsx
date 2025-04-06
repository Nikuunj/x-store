import { useRecoilState } from "recoil"
import { elementOpenStateFamily } from "../store/oepnCloseState";
import { ProductDetailProps } from "../types/productType";


function ProductDetail(props: ProductDetailProps) {
    

    const [open, setOpen] = useRecoilState(elementOpenStateFamily(props.id));
    const handleClose = () => {
        setOpen(false);
    }

    console.log(open)
    return (
        <>
            {open && <div className="absolute inset-0 h-screen w-screen bg-amber-500 flex items-center justify-center z-50"
             onClick={handleClose}>
                    <div className="bg-white text-black p-8 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                        hi am here {props.id}
                    </div>
            </div>}
        </>
    )
}

export default ProductDetail