import {createRoutesFromElements,Route,RouterProvider,Routes,BrowserRouter,createBrowserRouter} from 'react-router-dom'
import { Home } from './Components/Home';
import { Products } from './Components/Products';
import { Main } from './Components/Main';
import { ProductReview } from './Components/ProductReview';
import { ShoppingCart } from './Components/ShoppingCart';
import { Context } from './Components/Context';
import { Login } from './Auth components/Login';
import { Signup } from './Auth components/Signup';
import { Dashboard } from './Auth components/Dashboard';
import { Orders } from './Components/Dashboard components/Orders';
import { Favorite } from './Components/Dashboard components/Favorite';
import { LogOut } from './Components/Dashboard components/LogOut';
import { Setting } from './Components/Dashboard components/Setting';
import { AccountProtector, Protector } from './helper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRedirect from './LoginRedirect';
import { Contact } from './Components/Contact';
import { Discount } from './Components/Discount';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Main />}>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/discount' element={<Discount />} />
        <Route path='/product/:id' element={<ProductReview />} />
        <Route path='/shopping-cart' element={<ShoppingCart />} />
        <Route path='/login' element={<Protector><Login /></Protector>} />
        <Route path='/sign-up' element={<Protector><Signup /></Protector>} />
        <Route path='/my-account' element={<AccountProtector><Dashboard /></AccountProtector>} >
          <Route path='' element={<Orders />} />  
          <Route path='setting' element={<Setting />} />  
          <Route path='favorite' element={<Favorite />} />  
          <Route path='log-out' element={<LogOut />} />  
        </Route>
        <Route path='/connect/:providerName/redirect' element={<LoginRedirect />}/>
      </Route>
    )
  )
  return (
    <Context >
      <RouterProvider router={router} />
      {/* <BrowserRouter basename='/ecommerce-react'>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route exact path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/contact' element={<Contact />}/>
            <Route path='/discount' element={<Discount />} />
            <Route path='/product/:id' element={<ProductReview />} />
            <Route path='/shopping-cart' element={<ShoppingCart />} />
            <Route path='/login' element={<Protector><Login /></Protector>} />
            <Route path='/sign-up' element={<Protector><Signup /></Protector>} />
            <Route path='/my-account' element={<AccountProtector><Dashboard /></AccountProtector>} >
              <Route path='' element={<Orders />} />  
              <Route path='setting' element={<Setting />} />  
              <Route path='favorite' element={<Favorite />} />  
              <Route path='log-out' element={<LogOut />} />  
            </Route>
            <Route path='/connect/:providerName/redirect' element={<LoginRedirect />}/>
          </Route>
        </Routes>
      </BrowserRouter> */}
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </Context>
  )
}

export default App;
