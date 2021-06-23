import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

 import { useForm } from "react-hook-form"; 
 import { useState, useEffect } from "react";
 import { useHistory } from "react-router-dom";

function AddCollege() {

  const [data, setData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };

  useEffect(() => {
    fetch(httpUrl + "admin/allZones", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //data.sort((a, b) => a.zone_no - b.zone_no);
        console.log(data);
        setData(data);
      });
  }, []);


  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
      console.log(data);
        const requestOptionsPost = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: validToken },
        body:JSON.stringify(data)
    };
    fetch(httpUrl + "admin/createCollege/", requestOptionsPost)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["message"] === "CREATED") {
            history.push("/admin/college");
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
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <span className="h2">Add new College</span>
            </div>
            <div className="container-fluid">
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <div className="col-sm-12 mb-2">
                  <label htmlFor="collegeType" className="form-check-label">
                    Type of College
                  </label>
                </div>
                <div className="col-sm-3">
                  <input
                    type="radio"
                    name="type"
                    id="govt"
                    value="Govenment College"
                    className="form-check-input"
                    ref={register({ required: true })}
                  />
                  <label htmlFor="govt" className="form-check-label">
                    Govenment College
                  </label>
                </div>
                <div className="col-sm-3">
                  <input
                    type="radio"
                    name="type"
                    id="affliated"
                    value="Affliated College"
                    className="form-check-input"
                    ref={register({ required: true })}
                  />
                  <label htmlFor="affliated" className="form-check-label">
                    Affliated College
                  </label>
                </div>
                <div className="col-sm-3">
                  <input
                    type="radio"
                    name="type"
                    id="universityDepartment"
                    className="form-check-input"
                    value="University Department"
                    ref={register({ required: true })}
                  />
                  <label
                    htmlFor="universityDepartment"
                    className="form-check-label"
                  >
                    University Department
                  </label>
                </div>
                <div className="col-sm-3">
                  <input
                    type="radio"
                    name="type"
                    id="constituent"
                    className="form-check-input"
                    value="Constituent"
                    ref={register({ required: true })}
                  />
                  <label htmlFor="constituent" className="form-check-label">
                    Constituent
                  </label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <label htmlFor="collegeName">Name of the college</label>
                  <input
                    type="text"
                    id="collegeName"
                    name="name"
                    className="form-control"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <label htmlFor="collegeCode">College Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="collegeCode"
                    name="code"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="zone">Zone</label>
                  <select className="form-select" id="zone" name="zone_id" ref={register({ required: true })}>
                    {data.map((d)=>{
                      return(
                      <option value={d.id}>{d.zone_no}--{d.zone_name}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <label htmlFor="contactEmail">Email</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    className="form-control"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="contactNumber">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactNumber"
                    name="contact_number"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10"></div>
                <div className="col-sm-2 d-grid gap-1">
                  <button className="btn btn-primary ">Submit</button>
                </div>
              </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default AddCollege;
