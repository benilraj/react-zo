import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

/* import { useForm } from "react-hook-form"; */
 import { useState, useEffect } from "react"; 
 import { Link } from "react-router-dom";

function EditBasicInformation() {
  const [basicData, setBasicData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";

  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
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

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <div className="card">
              <div className="card-header h5">Edit Basic Information</div>
              <div className="card-body">
              <div className="row">
                  <div className="col-sm-2">
                    College Id:
                    <span className="form-control">{basicData.code}</span>
                  </div>
                  <div className="col-sm-2">
                    Zone:
                    <span className="form-control">
                      {basicData.zone_no}-- {basicData.zone_name}
                    </span>
                  </div>

                  <div className="col-sm-4">
                    College Name:
                    <input type="text" name="name" value={basicData.name} className="form-control"/>
                  </div>
                  <div className="col-sm-4">
                    College Type:
                    <span className="form-control">{basicData.type}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4">
                    Contact Number:
                    <span className="form-control">
                      {basicData.contact_number}
                    </span>
                  </div>
                  <div className="col-sm-4">
                    Contact Email
                    <span className="form-control">{basicData.email}</span>
                  </div>
                  <div className="col-sm-4">
                    Address:
                    <span className="form-control">
                      <pre>{basicData.address}</pre>
                    </span>
                  </div>
                </div>
                <div className="row float-end">
                  <Link className="btn btn-warning" to="/college/editbasicinformation">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default EditBasicInformation;
