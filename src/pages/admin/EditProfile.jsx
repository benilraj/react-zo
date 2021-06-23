import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
/* import {Link } from "react-router-dom";  */

function EditProfileAdmin() {
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const { register, handleSubmit, watch, errors } = useForm();
  const submitPassword = (data) => {
    console.log(data);
    const requestOptionsPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: validToken,
      },
      body: JSON.stringify(data),
    };
    fetch(httpUrl + "admin/changePassword/", requestOptionsPost)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === "password changed successfully") {
          alert(JSON.stringify(data));
          window.location.reload(false);
        } else {
          alert(JSON.stringify(data));
        }
      });
  };

  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  const [basicData, setBasicData] = useState([]);
  const {
    register: infoRegister,
    errors: infoError,
    handleSubmit: infoSubmit,
    watch: infoWatch,
  } = useForm();
  useEffect(() => {
    fetch(httpUrl + "admin/basicInformation", requestOptions)
      .then((response) => response.json())
      .then((basicData) => {
        console.log(basicData);
        setBasicData(basicData);
      });
  }, []);

  const basicInformationSubmit=(data)=>{
    const requestOptionsPost = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: validToken,
        },
        body: JSON.stringify(data),
      };
      fetch(httpUrl + "admin/updateBasicInfo/", requestOptionsPost)
      .then((response) => response.json())
      .then((data) => {
        if (data['message'] === "UPDATED") {
          alert(JSON.stringify(data));
          window.location.reload(false);
        } else {
          alert(JSON.stringify(data));
        }
      });
  }
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <span className="h3">Edit Profile</span>
            <hr />
            <div className="card mb-3">
              <form onSubmit={infoSubmit(basicInformationSubmit)}>
                <div className="card-header h5">Basic Information</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-4">
                      Name
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        defaultValue={basicData.name}
                        ref={infoRegister({ required: true })}
                      />
                    </div>
                    <div className="col-sm-4">
                      Employee Id
                      <span className="form-control bg-light">
                        {basicData.employee_id}
                      </span>
                    </div>
                    <div className="col-sm-4">
                      Position
                      <span className="form-control bg-light">
                        {basicData.position}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      Contact Email
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        defaultValue={basicData.email}
                        ref={infoRegister({ required: true })}
                      />
                    </div>
                    <div className="col-sm-4">
                      Contact Number
                      <input
                        type="number"
                        name="contact_number"
                        className="form-control"
                        defaultValue={basicData.contact_number}
                        ref={infoRegister({ required: true })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-10"></div>
                    <div className="col-sm-2 d-grid gap-0">
                      <button className="btn btn-primary" type="submit">
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="card mb-3">
              <div className="card-header h5">Change Password</div>
              <div className="card-body">
                <form onSubmit={handleSubmit(submitPassword)}>
                  <div className="row">
                    <div className="col-sm-4">
                      Old Password
                      <input
                        type="password"
                        className="form-control"
                        name="oldPassword"
                        ref={register({ required: true })}
                      />
                      {errors.oldPassword && (
                        <span className="text-danger">
                          Old Password is Required
                        </span>
                      )}
                    </div>
                    <div className="col-sm-3">
                      New Password
                      <input
                        type="password"
                        className="form-control"
                        name="newPassword"
                        ref={register({ required: true })}
                      />
                      {errors.newPassword && (
                        <span className="text-danger">
                          New Password is Required
                        </span>
                      )}
                    </div>
                    <div className="col-sm-3">
                      Confrim Password
                      <input
                        type="password"
                        className="form-control"
                        name="confrimPassword"
                        ref={register({ required: true })}
                      />
                      {errors.confrimPassword && (
                        <span className="text-danger">
                          Confrim Password is Required
                        </span>
                      )}
                    </div>
                    <div className="col-sm-2 d-grid">
                      &nbsp;
                      <button type="submit" className="btn btn-primary gap-0">
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default EditProfileAdmin;
