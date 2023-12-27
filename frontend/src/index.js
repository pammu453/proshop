import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ShippingScreen from './screen/ShippingScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import PaymentScreen from './screen/PaymentScreen';
import ProfileScreen from './screen/ProfileScreen';

//redux set up
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/PrivateRoute';

//paypal setup
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

import AdminRoute from './components/AdminRoute';
import OrderList from './screen/Admin/OrderList';
import ProductListScreen from './screen/Admin/ProductListScreen';
import ProductEditListScreen from './screen/Admin/ProductEditListScreen';
import UsersList from './screen/Admin/UsersList';
import UsersEditScreen from './screen/Admin/UsersEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/products/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/place-order' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderList />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/product/:id' element={<ProductEditListScreen />} />
        <Route path='/admin/userlist' element={<UsersList />} />
        <Route path='/admin/user/:id/edit' element={<UsersEditScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
