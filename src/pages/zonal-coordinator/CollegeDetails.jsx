import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

/* import { useForm } from "react-hook-form"; */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CollegeDetails() {
  const httpUrl = "http://3.15.39.76:8000/";
  const [data, setData] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "/zonalCoordinator/allColleges", requestOptions)
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
              <h1 className="h2">Colleges</h1>
            </div>
            <table className="table table-striped">
              <thead>
                <th>S.no</th>
                <th>College Code</th>
                <th>College Name</th>
                <th>Contact Email</th>
                <th>Contact Number</th>
                <th>Options</th>
              </thead>
              <tbody>
                {data.map((d, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{d.code}</td>
                      <td>{d.name}</td>
                      <td>{d.email}</td>
                      <td>{d.contact_number}</td>
                      <td><Link className="btn btn-primary" 
                      to={{
                        pathname:"/zonalcoordinator/collegeinfrastructure",
                        state:d
                    }}
                      >
                      View Infrastructure
                      </Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
}

export default CollegeDetails;
