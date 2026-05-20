import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import Itemspage from './components/Itemspage.jsx'
import Sell from './components/sell.jsx'
import Item from './components/Item.jsx'
import Mycart from './components/Mycart.jsx'
import Orders from './components/Orders.jsx'
import Delivery from './components/Delivery.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate to={'/login'}/> } /> 
        <Route path='/login' element = {<Login/>} />
        <Route path='/signup' element = {<Signup/>} />
        <Route
          path='/home'
          element={localStorage.getItem('token') ?<> <Navbar/> <Home /> </> : <Navigate to='/login' />}
        />
         <Route
          path='/Items'
          element={localStorage.getItem('token') ?<> <Navbar/> <Itemspage /> </> : <Navigate to='/login' />}
        />
         <Route
          path='/sell'
          element={localStorage.getItem('token') ?<> <Navbar/> <Sell /> </> : <Navigate to='/login' />}
        />
         
        <Route path="/item/:itemId" element={localStorage.getItem('token') ?<> <Navbar/> <Item/> </> : <Navigate to='/login' />} />
        <Route
          path='/Mycart'
          element={localStorage.getItem('token') ?<> <Navbar/> <Mycart /> </> : <Navigate to='/login' />}
        />
        <Route
          path='/Orders'
          element={localStorage.getItem('token') ?<> <Navbar/> <Orders /> </> : <Navigate to='/login' />}
        />
        <Route
          path='/Delivery'
          element={localStorage.getItem('token') ?<> <Navbar/> <Delivery /> </> : <Navigate to='/login' />}
        />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
