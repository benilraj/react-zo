import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
/* import {Link } from "react-router-dom";  */
import { useHistory } from "react-router-dom";
function Fixtures(props) {
  
  let history = useHistory();
  let count = props.location.state.count;
  let eventId = props.location.state.id;
  let eventName = props.location.state.event;
  const { register, handleSubmit, watch, errors } = useForm();
  const [data, setData] = useState([]);
  const [field, setFieldData] = useState([]);
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
        console.log(data);
      });
  }, []);

  const onSubmit = (data) => {
    console.log('befre');
    console.log(data);
    history.push({
      pathname:"/zonalcoordinator/fixtures/confrim",
      state:{
          fixtures:data
       }
     });
  };
  function checkIfDuplicateExists(w){
    return new Set(w).size !== w.length 
}

  console.log(count);
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row"><div className="col-sm-6">
            {data.map((field, index) => {
              return (
                  <div className="mt-3 mb-2">
                    <div className="text-success">
                      {" "}
                      {index === 0 ? "Winner" : " "}
                    </div>
                    <div className="text-danger">
                      {" "}
                      {index === count - 1 ? "Runner" : " "}
                    </div>
                    {index != 0 && index!=count-1 ? index+1 : " "}
                    <select
                      name={index}
                      ref={register}
                      className="form-control"
                      id=""
                    >
                      {data.map((f, i) => {
                        return <option value={f.id}>{f.name}</option>;
                      })}
                    </select>
                  </div>
              );
            })}
            <div className="row float-right">
              <button className="btn btn-primary">Submit </button>
            </div>
            </div> </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default Fixtures;
