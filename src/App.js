import React from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import AddProduct from "./pages/product/addproduct";
import EditProduct from "./pages/product/editproduct";
import AddCategory from "./pages/category/addcategory";
import EditCategory from "./pages/category/editcategory";
import Order from "./pages/order/Order";
import Customer from "./pages/customer/Customer";
import PrivateComponent from './components/PrivateComponents';
import Store from "./pages/store/Store";
import Register from "./pages/register/Register";
import Appointment from './pages/appointment/Appointment';
import ViewAppointment from './pages/appointment/View';
import Staff from './pages/staff/Staff';
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import AddStaff from './pages/staff/addstaff';
import StaffEdit from './pages/staff/editstaff';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
			<Route path="register" element={<Register />} />
          <Route index element={<Login />} />          
          <Route element={<PrivateComponent />}  >            
            <Route path="dashboard" element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="product/edit/:editid" element={<EditProduct />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="category/edit" element={<EditCategory />} />
            <Route path="order" element={<Order />} />
            <Route path="customer" element={<Customer />} />
            <Route path="store" element={<Store />} />
            <Route path="appointment" element={<Appointment/>}/>
            <Route path="appointment/view/:viewid" element={<ViewAppointment/>}/>
            <Route path="staff" element={<Staff/>}/>
            <Route path="staff/add" element={<AddStaff/>}/>
            <Route path="staff/edit" element={<StaffEdit/>}/>
            <Route path="staff/edit/:editid" element={<StaffEdit/>}/>
           
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
