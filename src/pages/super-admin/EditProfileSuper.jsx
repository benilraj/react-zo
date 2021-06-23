import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
/* import {Link } from "react-router-dom";  */

function EditProfileSuper() {
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
    fetch(httpUrl + "superAdmin/changePassword/", requestOptionsPost)
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

export default EditProfileSuper;
