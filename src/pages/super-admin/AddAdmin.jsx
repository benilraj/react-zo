import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function AddAdmin() {
    let history = useHistory();
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
      console.log(data);
       const requestOptionsPost = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: validToken },
        body:JSON.stringify(data)
    };
    fetch(httpUrl + "superAdmin/createAdmin/", requestOptionsPost)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["message"] === "CREATED") {
            history.push("/superadmin/admin");
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
              <span className="h2">Add new Admin </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="container">
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    ref={register}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="employee_id">Employee Id:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="employee_id"
                    id="employee_id"
                    ref={register}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="email">Contact Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    ref={register}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="contact_number">Contact Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="contact_number"
                    id="contact_number"
                    ref={register}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    name="position"
                    id="position"
                    ref={register}
                  />
                </div>
              </div>
              <div className="row float-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;
