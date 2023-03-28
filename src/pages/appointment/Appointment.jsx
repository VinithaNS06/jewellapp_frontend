import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import config from "../../config.json";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Appoinment = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [appointmentsInfo, setAppointmentsInfo] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getAppointmentsData = async () => {
    axios
      .get(
        config.apiurl +
          "/schedule/all_list?startDate=2023-01-01&endDate=2023-03-28&status=Completed",
        {
          headers: {
            Authorization: "Bearer " + accesstoken.data.access_token,
          },
        }
      )
      .then((res) => {
        setAppointmentsInfo(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);
  // function getProductvalue(appt) {
  //   const apptvalue = JSON.parse(appt);
  //   return apptvalue;
  // }
  // const updateStatus=async()=>{
  //   let updatedetails=await fetch(config.apiurl+"/schedule/"+params.updateid,{
  //     method:'put',
  //     body: {schedule_status:"Completed"},
  //     headers:{
  //       'Authorization': 'bearer '+accesstoken.data.access_token
  //   }
  //   });
  //   updatedetails=await updatedetails.json();
  //   setUpdateApptInfo(updatedetails.data.schedule_status);
  //   // setUpdateApptInfo(updatedetails.data.usclassName=er_phone);
  //   console.log(updatedetails.data.schedule_status);
  //   // console.log(updatedetails.data.user_phone);
  // }

  return (
    <>
      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <Sidebar />
      <main className="main-content position-relative border-radius-lg ">
        <Header />
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-header pb-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Appointment</h6>
                    </div>
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
                          <th className="text-secondary opacity-7">
                            User Details
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Date&Time
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Status
                          </th>
                          <th className="text-secondary opacity-7 ps-2">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointmentsInfo &&
                          appointmentsInfo.length &&
                          appointmentsInfo.map((item, index) => (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-1 text-sm ">
                                      Name:{item.user_id.name}
                                    </h6>
                                    <p className="text-xs mb-2">
                                      Email:{item.user_id.email}
                                    </p>
                                    <p className="text-xs mb-2">
                                      Mobile:
                                      <span className="text-secondary">
                                        {item.user_id.phone}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <p className="text-xs mb-2">
                                      <span className="text-dark font-weight-bold ms-sm-2">
                                        {item.date}
                                      </span>
                                    </p>
                                    <p className="text-xs mb-2">
                                      <span className="text-dark font-weight-bold ms-sm-2">
                                        {item.time}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div className="d-flex flex-column justify-content-center">
                                    <p className="text-xs mb-2">
                                      <span className="text-dark font-weight-bold ms-sm-2">
                                        {item.schedule_status}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="ms-auto">
                                  <a
                                    href={"/appointment/view/" + item._id}
                                    className="btn btn-link text-dark px-3 mb-0"
                                  >
                                    <i
                                      className="fa fa-eye-alt text-dark me-2"
                                      aria-hidden="true"
                                    ></i>
                                    View
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

export default Appoinment;
