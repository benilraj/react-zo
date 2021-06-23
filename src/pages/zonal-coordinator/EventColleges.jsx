import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";

/* import { useForm } from "react-hook-form"; */
import {Link } from "react-router-dom"; 
function EventColleges(props) {
  const eventId = props.location.state.id;
  const game = props.location.state.event;

  const [data, setData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(
      httpUrl + "/zonalCoordinator/eventColleges/" + eventId,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
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
              <span className="h4">Colleges participating in {game}</span>{" "}
              {/* <Link to={{pathname:"/zonalcoordinator/fixtures",
                      state:props.location.state}} className="btn btn-primary float-end">
                Initiate Fixtures
              </Link> */}
            </div>
            <ol>
              {data.map((e) => {
                return <li>{e.name}</li>;
              })}
            </ol>
          </main>
        </div>
      </div>
    </>
  );
}

export default EventColleges;
