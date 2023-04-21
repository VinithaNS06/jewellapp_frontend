import config from "../../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import _ from "lodash";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/headerbar/Header";

const AddAbout = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [about, setAbout] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = async () => {
    let abtresult = await fetch(config.apiurl + "/aboutlist/get_about");
    abtresult = await abtresult.json();
    console.log(abtresult?.data?.results[1]);
    setAbout(abtresult?.data?.results[1]);
  };

  const [title, setTitle] = useState("");

  const [foundation, setFoundation] = useState("");
  const [remark, setRemark] = useState("");
  const [members, setMemebers] = useState("");
  const [image, setImage] = useState("");

  const [imagepreview, setImagepreview] = useState("");
  const [imagede, setImagede] = useState("");

  const [updateid, setUpdateid] = useState("");
  const [error, setError] = useState(false);
  const [mainCategoryParam, setMainCategoryParam] = useState("");

  const handlecategory = async (event) => {
    setAbout(event.target.value);
  };

  const handleImageupload = async (event) => {
    const fileup = event.target.files[0];
    Transformfile(fileup);
  };

  const Transformfile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(file.name);
        setImagepreview(reader.result);
        setImagede(file);
      };
    } else {
      setImage("");
      setImagepreview("");
      setImagede("");
    }
  };

  const submitProductDetails = async (res) => {
    const editupdateurl = config.apiurl + "/about/";
    const configdata = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    };

    const ondataSuccess = (response) => {
      navigate("/about");
    };
    const ondataFailure = (err) => console.log(err);
    const editdata = {
      title: title,
      remark: remark,
      image: res,
    };
    axios
      .post(editupdateurl, editdata, configdata)
      .then(ondataSuccess, ondataFailure);
  };

  const handleProsubmit = async () => {
    if (!title) {
      setError(true);
      return false;
    }

    const imageupurl = config.apiurl + "/upload/upload-single";
    const configimg = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "bearer " + accesstoken.data.access_token,
      },
    };
    const formData = new FormData();
    formData.append("file", imagede);

    const onSuccess = (response) => {
      submitProductDetails(response.data.data.filename);
    };
    const onFailure = (err) => console.log(err);
    axios.post(imageupurl, formData, configimg).then(onSuccess, onFailure);
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
                      <h6 className="mb-0">Add About</h6>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Title
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                        {error && !title && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the About title
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Foundation
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          value={foundation}
                          onChange={(e) => {
                            setFoundation(e.target.value);
                          }}
                        />
                        {error && !title && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the About title
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Members
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          value={members}
                          onChange={(e) => {
                            setMemebers(e.target.value);
                          }}
                        />
                        {error && !title && (
                          <span className="text-danger text-gradient text-xs text-secondary">
                            Enter the About title
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label
                          htmlFor="example-text-input"
                          className="form-control-label"
                        >
                          Image
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(event) => handleImageupload(event)}
                        />
                      </div>
                    </div>
                    {imagepreview ? (
                      <div className="col-md-6">
                        {<img src={imagepreview} width="150" height="150" />}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="form-control-label"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={remark}
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="text-end">
                    <button
                      type="button"
                      onClick={handleProsubmit}
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
      </main>
    </>
  );
};
export default AddAbout;
