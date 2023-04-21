import config from "../../config.json";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";

const Customer = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getCustomers();
    viewCustomer();
  }, []);

  const getCustomers = async () => {
    let prodresult = await fetch(config.apiurl + "/customers/getCustomer");
    prodresult = await prodresult.json();
    setCustomers(prodresult.data.results);
  };
  const viewCustomer = async (id) => {
    let viewcust = await fetch(config.apiurl + "/customers/" + id, {
      method: "get",
      headers: {
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    });
    viewcust = await viewcust.json();
    if (viewcust) {
      navigate("/customer");
    }
  };

  const deleteCustomer = async (id) => {
    let deletecat = await fetch(config.apiurl + "/customers/" + id, {
      method: "Delete",
      headers: {
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    });
    deletecat = await deletecat.json();
    if (deletecat) {
      getCustomers();
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
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Customers</h6>
                    </div>

                    <div className="col-6 text-end">
                      {/* <AHrefJavascript="javascript:void(0);" className="btn btn-outline-primary btn-sm mb-0 "  >Import</a> &nbsp;&nbsp; */}
                      <Link
                        className="btn bg-gradient-dark mb-0"
                        to="/customer/add"
                      >
                        <i className="fas fa-plus" aria-hidden="true"></i>
                        &nbsp;&nbsp;Add New Customer
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-3">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-secondary opacity-7 ps-2">
                            S.No
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Customer Details
                          </th>
                          <th className="text-secondary opacity-7">Address</th>
                          <th className="text-secondary opacity-7">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>

                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <p className="text-xs mb-2">
                                    Name:{item.name}
                                  </p>
                                  <p className="text-xs mb-2">
                                    Email: {item.email}{" "}
                                  </p>
                                  <p className="text-xs mb-2">
                                    Mobile:{" "}
                                    <span className="text-secondary">
                                      {item.phone}
                                    </span>{" "}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {item.address}
                                  </h6>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="ms-auto">
                                <Link
                                  to={"/customer/edit/" + item._id}
                                  className="btn btn-link text-primary px-3 mb-0"
                                >
                                  <i
                                    className="fas fa-pencil-alt text-primary me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Edit
                                </Link>

                                <Link
                                  to={"/customer/view/" + item._id}
                                  className="btn btn-link text-success px-3 mb-0"
                                >
                                  <i
                                    className="fa fa-eye text-success me-2"
                                    aria-hidden="true"
                                  ></i>
                                  View
                                </Link>

                                <a
                                  className="btn btn-link text-danger text-gradient px-3 mb-0"
                                  onClick={() => deleteCustomer(item._id)}
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Customer;
