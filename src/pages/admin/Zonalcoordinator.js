import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";

/* import { useForm } from "react-hook-form"; */
import { Link } from "react-router-dom";


function Zonalcoordinator() {
  const [data, setData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };

  useEffect(() => {
    fetch(httpUrl + "admin/zonalCoordinator", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.zone_no - b.zone_no);
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
              <h1 className="h2">Zonal Coordiantor</h1>
            </div>
        
            <table className="table table-striped ">
              <thead>
                <th>Zone No</th>
                <th>Zone Name</th>
                <th>Zonal Coordinator Name</th>
                <th>Zonal Coordinator Contact Number</th>
                <th>Zonal Coordinator Email</th>
                <th>Options</th>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <tr>
                      <td>{d.zone_no}</td>
                      <td>{d.zone_name}</td>
                      <td>{d.zonalcoordinator_name}</td>
                      <td>{d.zonalcoordinator_contact_number}</td>
                      <td>{d.zonalcoordinator_email}</td>
                      <td>
                        {d.zonalcoordinator_id ? (
                          <Link to={{
                            pathname:"/admin/changezonalcoordinator",
                            state:d
                        }}  className="btn btn-warning">
                          Change
                        </Link>
                        ) : (
                            <Link to={{
                                pathname:"/admin/assignzonalcoordinator",
                                state:d
                            }}  className="btn btn-success">
                              Assign
                            </Link>
                        )}
                      </td>
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

export default Zonalcoordinator;
