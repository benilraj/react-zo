import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

function CollegeEditProfile() {
  const [basicData, setBasicData] = useState([]);
  const [infrastructureInfo, setInfrastrucutureInfo] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const { register, handleSubmit, watch, errors } = useForm();
  const {
    register: infrastructureRegister,
    errors: infrastructureError,
    handleSubmit: infrastructureSubmit,
    watch: infrastructureWatch,
  } = useForm();

  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };

  useEffect(() => {
    fetch(httpUrl + "college/info", requestOptions)
      .then((response) => response.json())
      .then((basicData) => {
        console.log(basicData);
        setBasicData(basicData);
      });
  }, []);

  useEffect(() => {
    fetch(httpUrl + "college/viewInfrastructure", requestOptions)
      .then((response) => response.json())
      .then((infrastructureInfo) => {
        console.log(infrastructureInfo);
        setInfrastrucutureInfo(infrastructureInfo);
      });
  }, []);
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
    fetch(httpUrl + "college/changePassword/", requestOptionsPost)
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


  const {
    register: infoRegister,
    errors: infoError,
    handleSubmit: infoSubmit,
    watch: infoWatch,
  } = useForm();

  const basicInformationSubmit = (data) => {
    const requestOptionsPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: validToken,
      },
      body: JSON.stringify(data),
    };
    fetch(httpUrl + "college/updateBasicInfo/", requestOptionsPut)
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] === "UPDATED") {
          alert(JSON.stringify(data));
          window.location.reload(false);
        } else {
          alert(JSON.stringify(data));
        }
      });
  };

  const infrastructureUpload = (data) => {
    var formData = new FormData();
    formData.append(`heading`, data.infrastructure_heading);
    for (let i = 0; i < data.image.length; i++) {
      formData.append(`image[${i}]`, data.image[i]);
    }
    const requestOptionsPost = {
      method: "POST",
      headers: { Authorization: validToken },
      body: formData,
    };
    fetch(httpUrl + "college/infrastructureUpload/", requestOptionsPost)
      .then((response) => response.json())
      .then((data) => {
        if (data["message"] === "CREATED") {
          window.location.reload(false);
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
              <div className="card-header h5">Basic Information</div>
              <div className="card-body">
              <form onSubmit={infoSubmit(basicInformationSubmit)}>
                  <div className="row">
                    <div className="col-sm-2">
                      College Id:
                      <span className="form-control bg-light">
                        {basicData.code}
                      </span>
                    </div>
                    <div className="col-sm-2">
                      Zone:
                      <span className="form-control bg-light">
                        {basicData.zone_no}-- {basicData.zone_name}
                      </span>
                    </div>

                    <div className="col-sm-4">
                      College Name:
                      <input
                        type="text"
                        name="name"
                        defaultValue={basicData.name}
                        id=""
                        className="form-control"
                        ref={infoRegister({ required: true })}

                      />
                    </div>
                    <div className="col-sm-4">
                      College Type:
                      <span className="form-control bg-light">
                        {basicData.type}
                      </span>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-4">
                      Contact Number:
                      <input
                        type="number"
                        name="contact_number"
                        defaultValue={basicData.contact_number}
                        className="form-control"
                        ref={infoRegister({ required: true })}

                      />
                    </div>
                    <div className="col-sm-4">
                      Contact Email
                      <input
                        type="email"
                        name="email"
                        defaultValue={basicData.email}
                        id=""
                        className="form-control"
                        ref={infoRegister({ required: true })}

                      />
                    </div>
                    <div className="col-sm-4">
                      Address:
                      <textarea name="address" class="form-control" id="" defaultValue={basicData.address} ref={infoRegister({ required: true })}>
                        
                      </textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-10"></div>
                    <div className="col-sm-2 d-grid gap-0">
                      <button type="submit" className="btn btn-primary">
                        Apply Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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

            <div className="card">
              <div className="card-header h5">Infrastructure Information</div>
              <div className="card-body">
                <form onSubmit={infrastructureSubmit(infrastructureUpload)}>
                  <div className="row">
                    <div className="col-sm-5">
                      <input
                        type="text"
                        name="infrastructure_heading"
                        placeholder="Heading"
                        className="form-control"
                        ref={infrastructureRegister({ required: true })}
                      />
                    </div>
                    <div className="col-sm-5">
                      <input
                        type="file"
                        className="form-control"
                        name="image[]"
                        ref={infrastructureRegister({ required: true })}
                        multiple
                      />
                    </div>
                    <div className="col-sm-2 d-grid gap-0">
                      <button className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
                <div className="row">
                  {/* infrastructureWatch("files")
                    ? infrastructureWatch("files")[0] !== undefined
                      ? infrastructureWatch("files").map((d,index)=>{

                      })
                        

                         <img
                      src= {URL.createObjectURL(infrastructureWatch("files")[0])}
                      alt=" "
                      style={{height:"10rem"}}
                    /> 
                      :  " "
                    : "" */}
                </div>

                <div className="row">
                  {infrastructureInfo.map((data, index) => {
                    return (
                      <div className="row">
                        <h5>{data.infrastructure_info}</h5>
                        {data.files.map((d, index) => {
                          return (
                            <img
                              src={httpUrl + d}
                              style={{ maxHeight: "100px", width: "200px" }}
                              alt=""
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default CollegeEditProfile;
