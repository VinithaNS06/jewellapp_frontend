import { useRef, useState, useEffect } from "react";
import "./login.scss";
import config from "../../config.json";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/dashboard");
    }
  }, []);

  const [errMsg, setErrMsg] = useState();
  const [email, setUeremail] = useState("");
  const [password, setUerpassword] = useState("");
  const handleLogin = async () => {
    let result = await fetch(config.apiurl + "/user/weblogin", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.status == "true") {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/order");
    } else {
      alert("Enter Correct values");
    }
  };

  return (
    <>
      <main className="main-content  mt-0">
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                <div className="card card-plain">
                  <div className="card-header pb-0 text-start text-center">
                    <img
                      src="../assets/img/jewelar.png"
                      className="navbar-brand-img h-500 mb-3"
                      alt="main_logo"
                      width="25%"
                    />
                    <br />
                    <span className="ms-1 font-weight-bold logintxtcl ">
                      M8 Jewel<span className="artextcol">AR</span>
                    </span>
                  </div>
                  <div className="card-body">
                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <form role="form">
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          aria-label="Email"
                          value={email}
                          onChange={(e) => {
                            setUeremail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          aria-label="Password"
                          value={password}
                          onChange={(e) => {
                            setUerpassword(e.target.value);
                          }}
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleLogin}
                          className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center pt-0 px-lg-2 px-1">
                    <p className="mb-4 text-sm mx-auto"></p>
                  </div>
                </div>
              </div>
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden loginbgscreen">
                  <span className="mask bg-primary opacity-6"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
