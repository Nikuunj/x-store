 
export interface ProductProps {
    id: string;
    title: string;
    price: number;
    description: string;
    imageLink: string;
    sellerName: string;
    delete?: boolean;
    edit?: boolean;
}

export type MiniProductProps = Pick<ProductProps, 'id' | 'title' | 'price' | 'imageLink' | 'sellerName'>
export type ProductDetailProps = Pick<ProductProps, 'id' | 'title' | 'price' | 'imageLink' | 'sellerName' | 'description'>