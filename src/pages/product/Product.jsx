import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./product.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const accesstoken = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let prodresult = await fetch(config.apiurl + "/product");
    prodresult = await prodresult.json();
    setProducts(prodresult.data.results);
  };

  const deleteProduct = async (id) => {
    let deletecat = await fetch(config.apiurl + "/product/" + id, {
      method: "Delete",
      headers: {
        Authorization: "Bearer " + accesstoken.data.access_token,
      },
    });
    deletecat = await deletecat.json();
    if (deletecat) {
      getProducts();
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
                      <h6 className="mb-0">Products</h6>
                    </div>

                    <div className="col-6 text-end">
                      {/* <a ahrefjavascript="javascript:void(0);" className="btn btn-outline-primary btn-sm mb-0 "  >Import</a> &nbsp;&nbsp; */}
                      <a
                        className="btn bg-gradient-dark mb-0"
                        href="/product/add"
                      >
                        <i className="fas fa-plus" aria-hidden="true"></i>
                        &nbsp;&nbsp;Add New Product
                      </a>
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
                            Category
                          </th>
                          <th className="text-secondary opacity-7">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={
                                      config.fileurl + "/" + item.image ||
                                      "/img/error.png"
                                    }
                                    className="avatar avatar-sm me-3"
                                    alt={item.title}
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-1 text-sm ">
                                    {item.title}
                                  </h6>
                                  <p className="text-xs mb-2">
                                    Carat: {item.carrot} &nbsp; Wastage:{" "}
                                    {item.wastage} &nbsp; Making: {item.making}{" "}
                                    &nbsp;
                                  </p>
                                  <p className="text-xs mb-2">
                                    Remarks:{" "}
                                    <span className="text-secondary">
                                      {item.remark}
                                    </span>{" "}
                                  </p>
                                  <p className="text-xs mb-0">
                                    Price:{" "}
                                    <span className="text-dark font-weight-bold ms-sm-2">
                                      {item.price}
                                    </span>{" "}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                {item.category_id.name}
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                {item.product}
                              </p>
                            </td>
                            <td>
                              <a
                                href={"/product/edit/" + item._id}
                                className="btn btn-link text-dark px-3 mb-0"
                              >
                                <i
                                  className="fas fa-pencil-alt text-dark me-2"
                                  aria-hidden="true"
                                ></i>
                                Edit
                              </a>
                              <a
                                className="btn btn-link text-danger text-gradient px-3 mb-0"
                                onClick={() => deleteProduct(item._id)}
                              >
                                <i
                                  className="far fa-trash-alt me-2"
                                  aria-hidden="true"
                                ></i>
                                Delete
                              </a>
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

export default Product;
