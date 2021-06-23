import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

/* import { useForm } from "react-hook-form"; */

function GameStudentList(props) {
  const [data, setData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const eventId = props.location.state.event_id;
  console.log(eventId);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "college/eventEnrollment/" + eventId, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  useEffect(() => {
    fetch(httpUrl + "college/eventStudent/" + eventId, requestOptions)
      .then((response) => response.json())
      .then((studentData) => {
        console.log(studentData);
        setStudentData(studentData);
      });
  }, []);

  let last_date_day = new Date(data.last_date).getDate();
  let last_date_month = new Date(data.last_date).getMonth() + 1;
  let last_date_year = new Date(data.last_date).getFullYear();
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom">
              <span className="h3">{data.name}</span>
            </div>
            <span>Last date for Enrollment :</span>{" "}
            <span className="text-danger fw-bold">{last_date_day+"-"+last_date_month+"-"+last_date_year}</span>
            <h4>Instructions:</h4>
            <pre>{data.instructions}</pre>
            <span className="h4">
              Student list:{" "}
              {studentData.length < 12 ? (
                <Link
                  to={{
                    pathname: "eligibilityperforma/create",
                    state: eventId,
                  }}
                  className="btn btn-success float-end"
                >
                  Enroll
                </Link>
              ) : (
                ""
              )}
            </span>
            <table className="table table-striped">
              <thead>
                <th>S.no</th>
                <th>Register Number</th>
                <th>Student Name</th>
                <th>Photo</th>
                <th>Options</th>
              </thead>
              <tbody>
                {studentData.map((s, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{s.registration_no}</td>
                      <td>{s.student_name}</td>
                      <td>
                        <img
                          src={httpUrl + s.candidate_photo}
                          style={{ height: "5rem" }}
                        />
                      </td>
                      <td>
                        <Link
                          to={{
                            pathname: "/college/eligibilityperforma/view",
                            state: {
                              key: s.id,
                            },
                          }}
                          className="btn btn-primary"
                        >
                          View
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

export default GameStudentList;
