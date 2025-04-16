import { atom, selector, selectorFamily } from "recoil";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeader = () => ({
  headers: {
      token: localStorage.getItem('token') || ''
  }
});


const sellerOrderListDefaultSelector = selector<any[]>({
    key: 'sellerOrderListDefaultSelector/Default',
    get: async () => {
      try {
          const res = await fetch(`${BACKEND_URL}/seller/purchase`, getAuthHeader());
    
          if (!res.ok) {
            throw new Error('Failed to fetch orders');
          }
    
          const data = await res.json();
          return data.innterJoin || [];
      } catch (err) {
        throw err;
      }
    },
});

export const sellerOrderListState = atom<any[]>({
    key: 'sellerOrderListState',
    default: sellerOrderListDefaultSelector,
});

export const sellerOrderIdListSelector = selector<number[]>({
    key: 'sellerOrderIdListSelector',
    get: ({ get }) => {
        const products = get(sellerOrderListState);
        return products.map((product: any) => product._id);
    },
});

export const sellerOrderSelectorFamily = selectorFamily<any | null, string>({
    key: 'sellerOrderSelectorFamily',
    get:
        (productId: string) =>
        ({ get }) => {
        const products = get(sellerOrderListState)
        return products.find((product: any) => product._id == productId) || null
    },
})

export const purchasedProductSelectorFamily = selectorFamily<any | null, { productId: string; purchaseId: string }>({
  key: 'purchasedProductSelectorFamily',
  get: ({ productId, purchaseId }) => ({ get }) => {
    const product = get(sellerOrderSelectorFamily(productId));
    if (!product || !Array.isArray(product.purchasedProduct)) return null;

    return product.purchasedProduct.find((product: any) => product._id === purchaseId) || null;
  },
});