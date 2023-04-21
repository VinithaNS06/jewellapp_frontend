import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Headerbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    if (auth == null) {
      navigate("/");
    }
  }, []);
  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
      id="navbarBlur"
      data-scroll="false"
    >
      <div className="container-fluid py-1 px-3">
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a
                ahrefjavascript="javascript:void(0);"
                onClick={logout}
                className="nav-link text-white font-weight-bold px-3"
              >
                <i className="fa fa-sign-out me-sm-1"></i>
                <span className="d-sm-inline d-none">Logout</span>
              </a>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a
                ahrefjavascript="javascript:void(0);"
                className="nav-link text-white font-weight-bold px-0"
              >
                <i className="fa fa-bell me-sm-1"></i>

                <span className="d-sm-inline d-none">Notification</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Headerbar;
