import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

/* import { useState} from "react"; */
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function AssignZonalcoordinator(props) {
    
  const zoneId = props.location.state.id;
  const zoneNo = props.location.state.zone_no;
  const zoneName = props.location.state.zone_name;
  let history = useHistory();
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
      console.log(data);
      data.zone_id=zoneId;

    const requestOptionsPost = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: validToken },
        body:JSON.stringify(data)
    };
    fetch(httpUrl + "admin/createZonalCoordinator/", requestOptionsPost)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["message"] === "CREATED") {
            history.push("/admin/zonalcoordinator");
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
  <span className="h3">Assign Zonal Coordinator </span>
            </div>
            <div className="container mb-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-2">
                  <div className="col-1">
                    Zone No:
                    <span className="form-control">{zoneNo}</span>
                  </div>
                  <div className="col-2">
                    Zone Name:
                    <span className="form-control">{zoneName}</span>
                  </div>
                  <div className="col-3">
                    Zonal Coordinator Name:
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      ref={register}
                    />
                  </div>
                  <div className="col-3">
                    Zonal Coordinator Contact Number:
                    <input
                      type="number"
                      name="contact_number"
                      id=""
                      className="form-control"
                      ref={register}
                    />
                  </div>
                  <div className="col-3">
                    Zonal Coordinator Email:
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id=""
                      ref={register}
                    />
                  </div>
                </div>
                <div className="row float-end">
                  <button type="submit" className="btn btn-primary">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default AssignZonalcoordinator;
