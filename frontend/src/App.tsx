import { RecoilRoot } from "recoil"
import { Suspense } from "react"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from "./pages/Layout"
import LandingPage from "./pages/LandingPage"
import ErrorPage from "./pages/ErrorPage"
import Product from "./pages/Product"
import PlaceOrder from "./pages/PlaceOrder"
import UserViewOrder from "./pages/UserViewOrder"
import SellerViewOrder from "./pages/SellerViewOrder"


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>🌀 Loading...</div>}>
          <RecoilRoot>
         
            <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="product" element={<Product />}/>
                  <Route path="purchase/:productId" element={<PlaceOrder />} />
                  <Route path="user/purchases" element={<UserViewOrder />} />
                  { localStorage.getItem('auth') === 'seller' && <Route path="seller/purchases" element={<SellerViewOrder />} />}
                  <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>

          </RecoilRoot>
      </Suspense>
    </BrowserRouter>
  )
}

export default App