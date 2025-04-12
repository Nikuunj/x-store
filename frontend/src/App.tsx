import { RecoilRoot } from "recoil"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./pages/Layout"
import LandingPage from "./pages/LandingPage"
import ErrorPage from "./pages/ErrorPage"
import Product from "./pages/Product"
import PlaceOrder from "./pages/PlaceOrder"
import UserViewOrder from "./pages/UserViewOrder"
import SellerViewOrder from "./pages/SellerViewOrder"
import AddProduct from "./pages/AddProduct"
import SellerOwnProduct from "./pages/SellerOwnProduct"

function App() {

  return (
    <BrowserRouter>
          <RecoilRoot>
            <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="product" element={<Product />}/>
                  <Route path="purchase/:productId" element={<PlaceOrder />} />
                  <Route path="user/purchases" element={<UserViewOrder />} />
                  <Route path="seller/purchases" element={<SellerViewOrder />} />
                  <Route path="seller/addproduct" element={<AddProduct />} />
                  <Route path="seller/viewproduct" element={<SellerOwnProduct />} />
                  <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </RecoilRoot>
    </BrowserRouter>
  )
}

export default App