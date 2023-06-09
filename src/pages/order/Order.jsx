import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./order.scss";
import config from "../../config.json";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);
  const [custdata, setCustdata] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async (id) => {
    let orderresult = await fetch(config.apiurl + "/webreport/orderlist/0", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    });

    orderresult = await orderresult.json();
    setOrders(orderresult?.data);
  };

  function getDeliverydetails(dd) {
    const ddvalue = JSON.parse(dd);
    return ddvalue;
  }

  function getProductdetails(pod) {
    const podvalue = JSON.parse(pod);
    return podvalue;
  }

  // async function getUserdetails(userid) {
  //   let custresult = await fetch(
  //     config.apiurl + "/api/webreport/userlist/" + userid,
  //     {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "bearer " + accesstoken.data.access_token,
  //       },
  //     }
  //   );
  //   custresult = await custresult.json();
  //   return custresult.data[0];
  // }

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
                      <h6 className="mb-0">Orders</h6>
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
                            #Order ID
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Product Details
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Amount Details
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            User Details
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.transaction_id}</td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={
                                      config.fileurl +
                                      "/" +
                                      getProductdetails(item.product_details)
                                        .image
                                    }
                                    className="avatar avatar-sm me-3"
                                    alt={
                                      getDeliverydetails(item.delivery_details)
                                        .ptitle
                                    }
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-1 text-sm ">
                                    {
                                      getDeliverydetails(item.delivery_details)
                                        .ptitle
                                    }
                                  </h6>
                                  <p className="text-xs mb-2">
                                    {
                                      getDeliverydetails(item.delivery_details)
                                        .pdescription
                                    }
                                  </p>
                                  <p className="text-xs mb-0">
                                    Price:{" "}
                                    <span className="text-dark font-weight-bold ms-sm-2">
                                      {
                                        getDeliverydetails(
                                          item.delivery_details
                                        ).actual_price
                                      }
                                    </span>{" "}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <p className="text-xs mb-2">
                                    Price:{" "}
                                    <span className="text-dark font-weight-bold ms-sm-2">
                                      {item.total_amount}
                                    </span>
                                  </p>
                                  <p className="text-xs mb-2">
                                    Delivery Fee:{" "}
                                    <span className="text-dark font-weight-bold ms-sm-2">
                                      {item.delivery_fee}
                                    </span>{" "}
                                  </p>
                                  <p className="text-xs mb-0">
                                    Total Amount:{" "}
                                    <span className="text-dark font-weight-bold ms-sm-2">
                                      {item.final_amount}
                                    </span>{" "}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-1 text-sm ">
                                    {item.user_id.name}
                                  </h6>
                                  <p className="text-xs mb-2">
                                    Email: {item.user_id.email}{" "}
                                  </p>
                                  <p className="text-xs mb-2">
                                    Mobile:{" "}
                                    <span className="text-secondary">
                                      {item.user_id.phone}
                                    </span>{" "}
                                  </p>
                                </div>
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

export default Order;
