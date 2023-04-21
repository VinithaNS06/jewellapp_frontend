import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
// import "./product.scss";
import config from "../../config.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Rate = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [rates, setRates] = useState([]);
  const [rate, setRateName] = useState({});
  const navigate = useNavigate();
  const onInputChange = async (e, index) => {
    const { name, value } = e.target;
    // console.log(name + "name");
    // console.log(value);
    //check to validate if entry is not a number
    rate[index] = value;
    setRateName({ ...rate });
  };
  const getRateData = async () => {
    axios
      .get(config.apiurl + "/rates/getrate", {
        headers: {
          Authorization: "Bearer " + accesstoken.data.access_token,
        },
      })
      .then((res) => {
        setRates(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = async (e, index, rate_id) => {
    const newRate = {
      rate: rate[index],
      rate_id,
    };
    console.log(newRate);
    fetch(config.apiurl + "/ratehistory/", {
      method: "POST",
      body: JSON.stringify(newRate),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesstoken.data.access_token,
      },
    })
      .then(() => toast.success("Rate Created Sucessfully"))
      .then(() =>
        setTimeout(() => {
          navigate("/rate");
        }, 5000)
      );
  };

  useEffect(() => {
    getRateData();
  }, []);

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
                      <h6 className="mb-0">Rates</h6>
                    </div>

                    {/* <div className="col-6 text-end">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-primary btn-sm mb-0 "
                      >
                        Import
                      </a>{" "}
                      &nbsp;&nbsp;
                      <a className="btn bg-gradient-dark mb-0" href="/rate/add">
                        <i className="fas fa-plus" aria-hidden="true"></i>
                        &nbsp;&nbsp;Add New Rate
                      </a>
                    </div> */}
                  </div>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-5">
                    <table className="table align-items-center mb-0 ">
                      <thead>
                        <tr>
                          <th className="text-secondary opacity-7 ps-2">
                            S.No
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Type
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Rate
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rates.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            {/* <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-1 text-sm ">{item.rowid}</h6>
                                </div>
                              </div>
                            </td> */}
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-1 text-sm ">{item.type}</h6>
                                </div>
                              </div>
                            </td>
                            {/* <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <p className="text-xs mb-2">
                                    <span className="text-dark font-weight-bold ms-sm-2">
                                      {item.default_rate}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td> */}
                            <td>
                              <div className="d-flex px-1 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <label
                                    htmlFor="example-text-input"
                                    className="form-control-label"
                                    type="number"
                                  >
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={
                                        rate[index] ? rate[index] : item.rate
                                      }
                                      onChange={(e) => onInputChange(e, index)}
                                    />
                                  </label>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="ms-auto">
                                <a
                                  className="btn btn-link text-dark px-3 mb-0"
                                  onClick={(e) =>
                                    handleSubmit(e, index, item._id)
                                  }
                                >
                                  <i
                                    className="fa fa-bookmark text-success me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Save
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Rate;
