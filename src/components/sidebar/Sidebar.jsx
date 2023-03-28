import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <aside
      className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>

        <Link className="navbar-brand m-0" to="/">
          <img
            src="../assets/img/jewelar.png"
            className="navbar-brand-img h-100"
            alt="main_logo"
          />{" "}
          &nbsp;&nbsp;&nbsp;
          <span className="ms-1 font-weight-bold">
            M8 Jewel<span className="artextcol">AR</span>
          </span>
        </Link>
      </div>
      <hr className="horizontal dark mt-0"></hr>
      <div
        className="collapse navbar-collapse  w-auto "
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link m-0 active" to="/dashboard">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-tachometer text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link m-0" to="/category">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-collection text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Category</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link m-0" to="/product">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-product-hunt text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Product</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link m-0" to="/order">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-cart text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link m-0" to="/customer">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-02 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Customer</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link m-0" to="/store">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-store-alt text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Store</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link m-0" to="/appointment">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-clock-o text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Appointment</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link m-0" to="/staff">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-02 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Staff</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
