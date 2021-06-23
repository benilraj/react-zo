import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

function EditCouncilMembers() {
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;

  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const requestOptionsPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: validToken,
      },
      body: JSON.stringify(data),
    };
    fetch(httpUrl + "zonalCoordinator/editCouncilMembers/", requestOptionsPut)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["message"] === "UPDATED") {
          history.push("/zonalcoordinator/councilmembers");
        } else {
          alert(JSON.stringify(data));
        }
      });
  };
  const [data, setData] = useState([]);
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };

  useEffect(() => {
    fetch(httpUrl + "zonalCoordinator/councilMembers/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);


  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <span className="h3">Add Council Members</span>
            </div>
            <div className="container">
              <form onSubmit={handleSubmit(onSubmit)}>
                Council Member 1
                <div className="row mb-1">
                  <div className="col-sm-4">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="member1_name"
                      id="name"
                      className="form-control"
                      defaultValue={data.member1_name}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                      type="text"
                      name="member1_contact_number"
                      id="contactNumber"
                      className="form-control"
                      defaultValue={data.member2_contact_number}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_email">Contact Email</label>
                    <input
                      type="email"
                      name="member1_email"
                      id="contactEmail"
                      className="form-control"
                      defaultValue={data.member1_email}
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                Council Member 2
                <div className="row mb-1">
                  <div className="col-sm-4">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="member2_name"
                      id="name"
                      className="form-control"
                      defaultValue={data.member2_name}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                      type="text"
                      name="member2_contact_number"
                      id="contactNumber"
                      className="form-control"
                      defaultValue={data.member2_contact_number}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_email">Contact Email</label>
                    <input
                      type="email"
                      name="member2_email"
                      id="contactEmail"
                      className="form-control"
                      defaultValue={data.member2_email}
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                Council Member 3
                <div className="row mb-1">
                  <div className="col-sm-4">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="member3_name"
                      id="name"
                      className="form-control"
                      defaultValue={data.member3_name}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                      type="text"
                      name="member3_contact_number"
                      id="contactNumber"
                      className="form-control"
                      defaultValue={data.member3_contact_number}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_email">Contact Email</label>
                    <input
                      type="email"
                      name="member3_email"
                      id="contactEmail"
                      className="form-control"
                      defaultValue={data.member3_email}
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                Council Member 4
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="member4_name"
                      id="name"
                      className="form-control"
                      defaultValue={data.member4_name}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                      type="text"
                      name="member4_contact_number"
                      id="contactNumber"
                      className="form-control"
                      defaultValue={data.member4_contact_number}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="contact_email">Contact Email</label>
                    <input
                      type="email"
                      name="member4_email"
                      id="contactEmail"
                      className="form-control"
                      defaultValue={data.member4_email}
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button className="btn btn-primary float-end">
                      Submit
                    </button>
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

export default EditCouncilMembers;
