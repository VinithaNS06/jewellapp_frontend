import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Category from "./pages/category/Category";

import AddCategory from "./pages/category/addcategory";
import EditCategory from "./pages/category/editcategory";
import Order from "./pages/order/Order";

import PrivateComponent from "./components/PrivateComponents";
import Store from "./pages/store/Store";
import Register from "./pages/register/Register";
import Appointment from "./pages/appointment/Appointment";
import ViewAppointment from "./pages/appointment/View";
import Staff from "./pages/staff/Staff";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddStaff from "./pages/staff/addstaff";
import StaffEdit from "./pages/staff/editstaff";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CategorySub from "./pages/SubCategory/SubCategory";
import Products from "./pages/products/Products";
import AddProducts from "./pages/products/addProducts";
import Productedit from "./pages/products/editProducts";
import Customer from "./pages/customer/Customer";
import AddCustomer from "./pages/customer/addCustomer";
import CustomerEdit from "./pages/customer/editCustomer";
import ViewCustomer from "./pages/customer/viewCustomer";
import Rate from "./pages/rate/Rate";
import RateAdd from "./pages/rate/addrate";
import RateEdit from "./pages/rate/editrate";
function App() {
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="register" element={<Register />} />
            <Route index element={<Login />} />
            <Route element={<PrivateComponent />}>
              <Route path="dashboard" element={<Home />} />
              <Route path="category" element={<Category />} />
              <Route path="products" element={<Products />} />
              <Route path="products/add" element={<AddProducts />} />
              <Route path="products/:id" element={<Productedit />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="category/edit" element={<EditCategory />} />
              <Route path="order" element={<Order />} />
              <Route path="customer" element={<Customer />} />
              <Route path="customer/add" element={<AddCustomer />} />
              <Route path="customer/edit" element={<CustomerEdit />} />
              <Route path="customer/edit/:editid" element={<CustomerEdit />} />
              <Route path="customer/view/:viewid" element={<ViewCustomer />} />

              <Route path="store" element={<Store />} />
              <Route path="appointment" element={<Appointment />} />
              <Route
                path="appointment/view/:viewid"
                element={<ViewAppointment />}
              />
              <Route path="staff" element={<Staff />} />
              <Route path="staff/add" element={<AddStaff />} />
              <Route path="staff/edit" element={<StaffEdit />} />
              <Route path="staff/edit/:editid" element={<StaffEdit />} />
              <Route path="subcategory" element={<CategorySub />} />
              <Route
                path="subcategory/edit/:editid1"
                element={<CategorySub />}
              />

              <Route path="rate" element={<Rate />} />
              <Route path="rate/add" element={<RateAdd />} />
              <Route path="rate/edit" element={<RateEdit />} />
              <Route path="rate/edit/:id" element={<RateEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
