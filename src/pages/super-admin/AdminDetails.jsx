import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
/* import { useForm } from "react-hook-form"; */

function AdminDetails() {
  const [data, setData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };

  useEffect(() => {
    fetch(httpUrl + "superAdmin/allAdmin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const requestOptionsPut = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  const disableUser = (e) => {
    let adminId = e.currentTarget.getAttribute("dataValue");
    fetch(httpUrl + "superAdmin/disableAdmin/" + adminId, requestOptionsPut)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        window.location.reload(false);
      });
  };
  const enableUser = (e) => {
    let adminId = e.currentTarget.getAttribute("dataValue");
    fetch(httpUrl + "superAdmin/enableAdmin/" + adminId, requestOptionsPut)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        window.location.reload(false);
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
              <span className="h2">Admin Details </span>
              <Link
                className="btn btn-primary float-end"
                to="/superadmin/newadmin"
              >
                Add new Admin
              </Link>
            </div>

            <table className="table">
              <thead>
                <th>S.no</th>
                <th>Name</th>
                <th>Employee Id</th>
                <th>Position</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Options</th>
              </thead>
              <tbody>
                {data.map((d, index) => {
                  return (
                      <tr>
                      <td>{index + 1}</td>
                      <td>{d.name}</td>
                      <td>{d.employee_id}</td>
                      <td>{d.position}</td>
                      <td>{d.contact_number}</td>
                      <td>{d.email}</td>
                      <td>
                        {d.disabled === 0 ? (
                          <button
                            class="btn btn-danger"
                            dataValue={d.id}
                            onClick={disableUser}
                          >
                            Disable
                          </button>
                        ) : (
                          <button
                            class="btn btn-success"
                            dataValue={d.id}
                            onClick={enableUser}
                          >
                            Enable
                          </button>
                        )}
                        &nbsp;
                        <Link to={{
                                pathname:"/superAdmin/editadmin",
                                state:d
                            }}  className="btn btn-warning">
                              Edit
                            </Link>
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

export default AdminDetails;
