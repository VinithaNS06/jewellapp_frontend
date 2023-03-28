import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./customer.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    let custresult = await fetch(config.apiurl + "/webreport/userlist/0", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    });
    custresult = await custresult.json();
    setCustomers(custresult.data);
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
                            Details
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Address
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-1 text-sm ">{item.name}</h6>
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
                              <p className="text-xs font-weight-bold mb-0">
                                {item.streetno} {item.streetname} {item.city}{" "}
                                {item.pincode}
                              </p>
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
