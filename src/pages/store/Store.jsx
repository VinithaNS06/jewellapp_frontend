import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./store.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getStore();
  }, []);

  const getStore = async () => {
    let storeresult = await fetch(config.apiurl + "/branch");
    storeresult = await storeresult.json();
    setStores(storeresult.data.results);
  };

  const [name, setLocation] = useState("");
  const [location, setAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [count, setCount] = useState(1);
  const [updateid, setUpdateid] = useState("");
  const [error, setError] = useState(false);

  const handleCatsubmit = async () => {
    if (!location || !name) {
      setError(true);
      return false;
    }
    let apicaturl = "";
    let methodapi = "";
    if (updateid) {
      apicaturl = config.apiurl + "/branch/" + updateid;
      methodapi = "put";
    } else {
      apicaturl = config.apiurl + "/branch";
      methodapi = "post";
    }

    let addstore = await fetch(apicaturl, {
      method: methodapi,
      body: JSON.stringify({ name, location, remark, count }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    });

    addstore = await addstore.json();
    if (addstore.status == "true") {
      getStore();
      setLocation("");
      setAddress("");
    }
  };

  const getStoreedit = async (editid) => {
    let storeeditdetails = await fetch(config.apiurl + "/branch/" + editid, {
      method: "get",
      headers: {
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    });
    storeeditdetails = await storeeditdetails.json();
    setLocation(storeeditdetails.data[0].name);
    setAddress(storeeditdetails.data[0].location);
    setUpdateid(storeeditdetails.data[0]._id);
  };

  const deleteStore = async (id) => {
    let deletest = await fetch(config.apiurl + "/branch/" + id, {
      method: "Delete",
      headers: {
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    });
    deletest = await deletest.json();
    if (deletest) {
      getStore();
      setLocation("");
      setAddress("");
    }
  };

  return (
    <>
      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <Sidebar />
      <main className="main-content position-relative border-radius-lg ">
        <Header />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header pb-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Store</h6>
                    </div>

                    {/* <div className="col-6 text-end">
                                    <a ahrefjavascript="javascript:void(0);" className="btn btn-outline-primary btn-sm mb-0 "  >Import</a> &nbsp;&nbsp;
                                    <a ahrefjavascript="/category/add" className="btn btn-outline-primary btn-sm mb-0 ">Add New</a>
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
                            Details
                          </th>
                          <th className="text-secondary opacity-7">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stores.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">{item.name}</h6>
                                  <p className="text-xs mb-2">
                                    Location: {item.location}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ms-auto">
                                <a
                                  className="btn btn-link text-dark px-3 mb-0"
                                  onClick={() => getStoreedit(item._id)}
                                >
                                  <i
                                    className="fas fa-pencil-alt text-dark me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Edit
                                </a>
                                <a
                                  className="btn btn-link text-danger text-gradient px-3 mb-0"
                                  onClick={() => deleteStore(item._id)}
                                >
                                  <i
                                    className="far fa-trash-alt me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Delete
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header pb-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Add/Edit Store</h6>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          for="example-text-input"
                          className="form-control-label"
                        >
                          Location
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter name"
                          required
                          value={name}
                          onChange={(e) => {
                            setLocation(e.target.value);
                          }}
                        />
                        {error && !name && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Name
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          for="example-text-input"
                          className="form-control-label"
                        >
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          rows="5"
                          value={location}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        ></textarea>
                        {error && !location && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the Address
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="text-end">
                      <button
                        type="button"
                        onClick={handleCatsubmit}
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

export default Store;
