import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

/* import { useForm } from "react-hook-form"; */

function PublishResult() {
  const [data, setData] = useState([]);
  const [collegeData, setCollegeData] = useState([]);
  const [result, setResultData] = useState([]);

  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "/zonalCoordinator/viewResults/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResultData(result);
      });
  }, []);
  useEffect(() => {
    fetch(httpUrl + "/zonalCoordinator/currentEvents/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);


  const fetchColleges = (event) => {
    console.log(event.target.value);
    fetch(
      httpUrl + "/zonalCoordinator/eventColleges/" + event.target.value,
      requestOptions
    )
      .then((response) => response.json())
      .then((collegeData) => {
        console.log(collegeData);
        setCollegeData(collegeData);
      });
  };
  console.log(result);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (values) => {
    console.log(values);
    const requestOptionsPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: validToken,
      },
      body: JSON.stringify(values),
    };
    fetch(httpUrl + "/zonalCoordinator/publishResult", requestOptionsPost)
      .then((response) => response.json())
      .then((result) => {
        console.log(result["message"]);
        if (result["message"] === "CREATED") {
          window.location.reload(false);
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
              <span className="h3">Publish Result</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-2">
                <div className="col-sm-3">
                  Event:
                  <select
                    name="event_id"
                    className="form-control"
                    id=""
                    onChange={fetchColleges}
                    ref={register}
                  >
                    <option value=""></option>
                    {data.map((e) => {
                      return( 
                        e.id===result.id?" ":
                      <option value={e.id}>{e.game_name}</option> 
                     );
                    })}
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-3">
                  I<sup>st</sup> Place
                  <select
                    name="first_college_id"
                    id=""
                    className="form-control"
                    ref={register}
                  >
                    {collegeData.map((college) => {
                      return <option value={college.id}>{college.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-sm-3">
                  II<sup>nd</sup> Place
                  <select
                    name="second_college_id"
                    id=""
                    className="form-control"
                    ref={register}
                  >
                    {collegeData.map((college) => {
                      return <option value={college.id}>{college.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-sm-3">
                  III<sup>rd</sup> Place
                  <select
                    name="third_college_id"
                    id=""
                    className="form-control"
                    ref={register}
                  >
                    {collegeData.map((college) => {
                      return <option value={college.id}>{college.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-sm-3">
                  IV<sup>th</sup> Place
                  <select
                    name="fourth_college_id"
                    id=""
                    className="form-control"
                    ref={register}
                  >
                    {collegeData.map((college) => {
                      return <option value={college.id}>{college.name}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="row float-end">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
            <h5>Results</h5>
            <table className="table table-striped">
              <thead>
                <th>S.no</th>
                <th>Event</th>
                <th>First Place</th>
                <th>Second Place</th>
                <th>Third Place</th>
                <th>Fourth Place</th>
              </thead>
              <tbody>
                {result.map((r, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{r.event_name}</td>
                      <td>{r.first_college_name}</td>
                      <td>{r.second_college_name}</td>
                      <td>{r.third_college_name}</td>
                      <td>{r.fourth_college_name}</td>
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

export default PublishResult;
