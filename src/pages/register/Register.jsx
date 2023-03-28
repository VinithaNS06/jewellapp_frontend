import { useRef, useState, useEffect } from "react";
import "./register.scss";
import config from "../../config.json";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState();
  const [event_id, setEventid] = useState("");
  const [name, setUsername] = useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [email_address, setUseremail] = useState("");
  const [proof_type, setProoftype] = useState("");
  const [proof_no, setProofnumber] = useState("");
  const [location, setUserlocation] = useState("");

  const handleprooftype = async (event) => {
    setProoftype(event.target.value);
  };

  const [password, setUerpassword] = useState("");
  const handleRegister = async () => {
    let result = await fetch("http://139.59.22.213:4523/api/visitors", {
      method: "post",
      body: JSON.stringify({
        event_id,
        name,
        phone_number,
        email_address,
        proof_type,
        proof_no,
        location,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.status == "true") {
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
                    <span className="ms-1 font-weight-bold logintxtcl ">
                      Jewellery Expo - 2023
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
                          type="hidden"
                          className="form-control form-control-lg"
                          placeholder="eventid"
                          aria-label="eventid"
                          value={event_id}
                          onChange={(e) => {
                            setEventid(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Name"
                          aria-label="Name"
                          value={name}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                          value={phone_number}
                          onChange={(e) => {
                            setPhonenumber(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          aria-label="Email"
                          value={email_address}
                          onChange={(e) => {
                            setUseremail(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-control"
                          value={proof_type}
                          onChange={(event) => handleprooftype(event)}
                        >
                          <option value="adhar">Adhar ID</option>
                          <option value="voterid">Voter ID</option>
                          <option value="driving">Driving</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          placeholder="Proof Number"
                          aria-label="Proof Number"
                          value={proof_no}
                          onChange={(e) => {
                            setProofnumber(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Location"
                          aria-label="Location"
                          value={location}
                          onChange={(e) => {
                            setUserlocation(e.target.value);
                          }}
                          required
                        />
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleRegister}
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

export default Register;
