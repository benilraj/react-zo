import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* import { useForm } from "react-hook-form"; */

function CouncilMembers() {
  const httpUrl = "http://3.15.39.76:8000/";
  const [data, setData] = useState([]);

  const [edit, setEditData] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "/zonalCoordinator/councilMembers", requestOptions)
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
              <span className="h2">Council Members</span>
              
              {data!="" ? (
                <Link to="/zonalcoordinator/editcouncilmembers" className="float-end btn btn-warning">
                  Edit
                </Link>
              ) : (
                <Link
                  to="/zonalcoordinator/addcouncilmembers"
                  className="float-end btn btn-primary"
                >
                  Add Council Members
                </Link>
              )}
            </div>
            <table className="table table-striped">
              <thead>
                <th>S.no</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Email</th>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{data.member1_name}</td>
                  <td>{data.member1_contact_number}</td>
                  <td>{data.member1_email}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>{data.member2_name}</td>
                  <td>{data.member2_contact_number}</td>
                  <td>{data.member2_email}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>{data.member3_name}</td>
                  <td>{data.member3_contact_number}</td>
                  <td>{data.member3_email}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>{data.member4_name}</td>
                  <td>{data.member4_contact_number}</td>
                  <td>{data.member4_email}</td>
                </tr>
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
}

export default CouncilMembers;
