import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";

const AddStaff = () => {
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
                      <h6 className="mb-0">Add Staff</h6>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <p className="text-uppercase text-sm">Staff Information</p>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          for="example-text-input"
                          className="form-control-label"
                        >
                          Staffname
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value="Praveen Pravin"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          for="example-text-input"
                          className="form-control-label"
                        >
                          Email address
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          value="test@example.com"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          for="example-text-input"
                          className="form-control-label"
                        >
                          First name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value="Test"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          for="example-text-input"
                          className="form-control-label"
                        >
                          Last name
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value="demo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="text-end">
                      <button
                        type="button"
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

export default AddStaff;
