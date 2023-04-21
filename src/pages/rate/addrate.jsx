import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
const RateAdd = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  // const [Raterowid, setRowId] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function addRate() {
    const newRate = {
      rate,
      type,
      status,
    };
    fetch(config.apiurl + "/rates/", {
      method: "POST",
      body: JSON.stringify(newRate),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesstoken.data.access_token,
      },
    })
      .then(() => toast("Rate Created Sucessfully"))
      .then(() =>
        setTimeout(() => {
          navigate("/rate");
        }, 5000)
      );
  }

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
                      <h6 className="mb-0">Add Rate</h6>
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
                          Rate
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={rate}
                          onChange={(e) => {
                            setRate(e.target.value);
                          }}
                        />
                        {error && !rate && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Rate
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
                          Type
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                        />
                        {error && !type && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Type
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
                          Status
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        />
                        {error && !status && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Status
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
                  <div className="row">
                    <div className="text-end">
                      <button
                        type="button"
                        onClick={addRate}
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

export default RateAdd;
