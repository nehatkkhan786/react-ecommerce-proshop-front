import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import OrderDetail from './pages/OrderDetail'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import UsersList from './pages/UsersList'
import ProductListAdmin from './pages/ProductListAdmin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Container} from 'react-bootstrap'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import {ProductProvider} from './ContextAndReducer/ProductContext'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'

function App() {
  return (
    <ProductProvider>
    <div>
    <ToastContainer/>
    <BrowserRouter>
    <Header/>
          <main className='py-3'>
            <Container>
            <Routes>
              <Route path='/' exact element={<Home/>} />
              <Route path='/product/:id' element={<ProductDetail/>} />
              <Route path='/login/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/profile' element={<Profile/>} />
              <Route path='/order/:id' element={<OrderDetail/>} />
              
              <Route path='/cart/*' element={<Cart/>} />
              <Route path='/shipping' element={<Shipping/>}/>
              <Route path='/payment' element={<Payment/>}/>
              <Route path='/placeorder' element={<PlaceOrder/>}/>

              {/* Routes For Admin Section */}
              <Route path='/admin/userslist/' element={<UsersList/>}/>
              <Route path='/admin/productlist/' element={<ProductListAdmin/>}/>
              <Route path='/admin/product/create_product/' element={<CreateProduct/>}/>
              <Route path='/admin/product/edit/:id' element={<EditProduct/>}/>
              
              </Routes>
            </Container>
          </main>
      
     
      <Footer/>
    </BrowserRouter>
    <ToastContainer/>
    </div>
    </ProductProvider>
  );
}

export default App;
