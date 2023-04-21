import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/headerbar/Header";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "../../components/sidebar/Sidebar";

const ViewAppointment = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const params = useParams();

  const [appointmentId, setAppointmentId] = useState("");
  const [username, setusername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [streetName, setStreetName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [productslist, setProducts] = useState([]);
  const [comments, setComments] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffValue, setStaffValue] = useState("");
  const [staffListInfo, setStaffListInfo] = useState([]);
  const [updateapptInfo, setUpdateApptInfo] = useState("");
  const [scheduleStatus, setScheduleStatus] = useState("");
  useEffect(() => {
    getStaffData();
    getAppointmentsView();
  }, []);
  const getStaffData = async () => {
    let staffList = await fetch(config.apiurl + "/staff/getstaff", {
      method: "get",
    });
    staffList = await staffList.json();
    setStaffListInfo(staffList.data.results);
  };

  const handleStaffsubmit = () => {
    navigate("/appointment");
  };

  const updateStatus = async () => {
    const scheduledata = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesstoken.data.access_token,
      },
      body: JSON.stringify({
        schedule_status: scheduleStatus,
        comments: comments,
        staffValue: staffValue,
      }),
    };
    console.log(scheduledata);
    fetch(config.apiurl + "/schedule/" + appointmentId, scheduledata);
  };

  const getAppointmentsView = async () => {
    let appointmentdetails = await fetch(
      config.apiurl + "/schedule/byid/" + params.viewid,
      {
        method: "get",
        headers: {
          Authorization: "bearer " + accesstoken.data.access_token,
        },
      }
    );
    appointmentdetails = await appointmentdetails.json();
    setAppointmentId(appointmentdetails?.data[0]?._id);
    setusername(appointmentdetails.data[0].user_id.name);
    setPhoneNumber(appointmentdetails.data[0].user_id.phone);
    setEmail(appointmentdetails.data[0].user_id.email);
    setStreetName(appointmentdetails.data[0].user_id.addresstype);
    setStatus(appointmentdetails.data[0].schedule_status);
    setDate(appointmentdetails.data[0].date);
    setTime(appointmentdetails.data[0].time);
    getProductvalue(appointmentdetails.data[0].products);
  };

  function getProductvalue(appt) {
    const apptvalue = JSON.parse(appt);
    setProducts(apptvalue);
  }

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
                      <h6 className="mb-0">Appointment View</h6>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12 col-sm-12 mb-xl-0 mb-4">
                    <div className="">
                      <div className="card-body p-3">
                        <div className="row">
                          <div className="numbers">
                            <p
                              className="text-sm mb-0 text-uppercase font-weight-bold"
                              style={{
                                margin: "20px 30px 20px 30px",
                                color: "black",
                                fontSize: "30px",
                              }}
                            >
                              Customer Details
                            </p>
                            <div className="table-responsive p-5">
                              <Card style={{ width: "18rem" }}>
                                <ListGroup variant="flush">
                                  <ListGroup.Item>
                                    Name :{username}
                                  </ListGroup.Item>
                                  <ListGroup.Item>
                                    Phone No :{phonenumber}
                                  </ListGroup.Item>
                                  <ListGroup.Item>
                                    Email :{phonenumber}
                                  </ListGroup.Item>
                                  <ListGroup.Item>
                                    Address :{streetName}
                                  </ListGroup.Item>
                                </ListGroup>
                              </Card>
                            </div>
                          </div>
                          <div>
                            <p
                              className="text-sm mb-0 text-uppercase font-weight-bold"
                              style={{
                                margin: "20px 30px 20px 30px",
                                color: "black",
                                fontSize: "30px",
                              }}
                            >
                              Appoinment Details
                            </p>
                            <div className="table-responsive p-5">
                              <Card style={{ width: "18rem" }}>
                                <ListGroup variant="flush">
                                  <ListGroup.Item>Date :{date}</ListGroup.Item>
                                  <ListGroup.Item>Time :{time}</ListGroup.Item>
                                  <ListGroup.Item>
                                    Status :{status}
                                  </ListGroup.Item>
                                </ListGroup>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-flex align-items-center">
                  <p
                    className="text-sm mb-0 text-uppercase font-weight-bold"
                    style={{
                      margin: "20px 30px 20px 30px",
                      color: "black",
                      fontSize: "30px",
                    }}
                  >
                    Product Details
                  </p>
                </div>
                <div className="table-responsive p-5">
                  <table className="table align-items-center mb-0 ">
                    <thead>
                      <tr>
                        <th className="text-secondary opacity-7 ps-2">S.No</th>
                        <th className="text-secondary opacity-7">Image</th>
                        <th className="text-secondary opacity-7 ps-2">Name</th>
                      </tr>
                    </thead>

                    <tbody>
                      {productslist &&
                        productslist.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={config.fileurl + item.image}
                                className="avatar avatar-sm me-3"
                                alt={item.name}
                              />
                            </td>
                            <td>{item.name}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header pb-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Update Status</h6>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          required=""
                          className="form-control-label"
                        >
                          Staff
                        </label>
                        <select
                          className="form-control"
                          value={staffValue}
                          onChange={(e) => setStaffValue(e.target.value)}
                        >
                          <option>Choose Staff Name</option>
                          {staffListInfo.map((stf) => (
                            <option value={stf._id} key={stf._id}>
                              {stf.name}- {stf.staffid}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          required=""
                          className="form-control-label"
                        >
                          Comments
                        </label>
                        <textarea
                          className="form-control"
                          name="stsComments"
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Status
                        </label>
                        <select
                          className="form-control"
                          name="status"
                          value={scheduleStatus}
                          onChange={(e) => setScheduleStatus(e.target.value)}
                        >
                          <option>Select Status</option>
                          <option>Accepted</option>
                          <option>Rejected</option>
                          <option>Confirmed</option>
                          <option>Cancelled</option>
                          <option>Completed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="text-end">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm ms-auto mt-5"
                        onClick={updateStatus}
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

export default ViewAppointment;
