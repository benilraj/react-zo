import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

/* import { useForm } from "react-hook-form"; */
import { useState, useEffect } from "react";
/* import {Link } from "react-router-dom";  */

function Results() {
  const [result, setResultData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "/admin/viewResults/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResultData(result);
      });
  }, []);

  const [filter, setFilterData] = useState([]);
  let filterDomain="";
  const changeFilter = (e) => {
    console.log(e.target.value);
    filterDomain=e.target.value;
    
    setFilterData(null);
    fetch(httpUrl + "admin/filterContent/" + e.target.value, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.sort((a, b) => a.zone_no - b.zone_no);
        console.log(result);
        setFilterData(result);
      });
  };

  const changeResults = (e) => {
  
    e.preventDefault();
    const key = e.target.zoneValue.value;
     fetch(httpUrl + "admin/filterResult/" + key, requestOptions)
      .then((response) => response.json())
      .then((result) => {
       // result.sort((a, b) => a.zone_no - b.zone_no);
        console.log(result);
        setFilterData(result);
      }); 
  };


  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <h3>Results</h3>
            <hr />
            <div className="card">
              <div className="card-header">
              <form onSubmit={changeResults}>
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-2">
                    <select
                     
                      id=""
                      className="form-control"
                      onChange={changeFilter}
                    >
                      <option></option>
                      <option value="zone">Zone</option>
                    </select>
                  </div>
                  <div className="col-sm-2">
                    <select  name="zoneValue" id="" className="form-control">
                  {filter===null?"":filter.map((d) => {
                            return (
                              <option value={d.zone_no}>
                                {d.zone_no}--{d.zone_name}
                              </option>
                            );
                          })} 
                    </select>
                  </div>
                  <div className="col-sm-1">
                    {filter === null ? (
                      ""
                    ) : (
                      <button className="btn btn-primary">Filter</button>
                    )}
                  </div>
                  
                </div>
                </form>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead className="text-center">
                    <th>S.no</th>
                    <th>Zone</th>
                    <th>Event</th>
                    <th>1st Place</th>
                    <th>2nd Place</th>
                    <th>3rd Place</th>
                    <th>4th Place</th>
                  </thead>
                  <tbody>
                    {result===null?
                  <span className="text-danger h1">NO DATA</span>
                :console.log(result.length)
                }
                    {result.map((r, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {r.zone_no}--{r.zone_name}
                          </td>
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
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Results;
