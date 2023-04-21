import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config.json";
import "./customer.scss";
const CustomerEdit = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  // const [rateid, setRateId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getCustomerView();
    // updateCustomer();
  }, []);
  const updateCustomer = async () => {
    const headers = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + accesstoken.data.access_token,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        address: address,
      }),
    };
    fetch(config.apiurl + `/customers/${params.editid}`, headers)
      .then(() => toast("Customer Updated Sucessfully"))
      .then(() =>
        setTimeout(() => {
          navigate("/customer");
        }, 5000)
      );
  };

  const getCustomerView = async () => {
    let CustomerDetails = await fetch(
      config.apiurl + `/customers/${params.editid}`,
      {
        method: "get",
        headers: {
          Authorization: "bearer " + accesstoken.data.access_token,
        },
      }
    );
    CustomerDetails = await CustomerDetails.json();

    setName(CustomerDetails.data.name);
    setEmail(CustomerDetails.data.email);
    setPhone(CustomerDetails.data.phone);
    setAddress(CustomerDetails.data.address);
    // getProductvalue(schemeDetails.data[0].products);
  };
  return (
    <>
      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <Sidebar />
      <main className="main-content position-relative border-radius-lg ">
        <Header />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Edit Customer</h6>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        {error && !name && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Name
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Email
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        {error && !email && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Email
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Phone
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                        {error && !phone && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Phone
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Address
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                        {error && !address && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Address
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
                  <div className="row">
                    <div className="text-end">
                      <button
                        type="submit"
                        onClick={updateCustomer}
                        className="btn btn-primary btn-sm ms-auto mt-5"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomerEdit;
