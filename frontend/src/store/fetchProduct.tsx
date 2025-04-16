import { atom, selector, selectorFamily } from 'recoil'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const productListDefaultSelector = selector<any[]>({
  key: 'productListState/Default',
  get: async ({ get }) => {
  
    get(refetchState);    
    const res = await fetch(`${BACKEND_URL}/product/0`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json(); // call this ONLY ONCE
    return data.productAll
  },
});

export const productSkipState  = atom<number>({
  key: 'productSkipState',
  default: 0,
});

export const refetchState = atom<boolean>({
  key: 'refetchState',
  default: false
})

export const productListState = atom<any[]>({
  key: 'productListState',
  default: productListDefaultSelector,
});

export const productIdListSelector = selector<number[]>({
  key: 'productIdListSelector',
  get: ({ get }) => {
    const products = get(productListState);
    return products.map((products: any) => products._id);
  },
});

export const productSelectorFamily = selectorFamily<any | null, string>({
  key: 'productSelectorFamily',
  get:
    (productId: string) =>
    ({ get }) => {
      const products = get(productListState)
      return products.find((product: any) => product._id == productId) || null
    },
})