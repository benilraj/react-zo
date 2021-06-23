import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import {Link } from "react-router-dom"; 




/* import { useForm } from "react-hook-form"; */

function EventRegistrationDetails() { 

  const httpUrl = "http://3.15.39.76:8000/";
  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "/zonalCoordinator/eventRegistrationDetails", requestOptions)
      .then((response) => response.json())
      .then((data) => {
       // console.log(data);
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
              <h1 className="h2">Event Registration Details</h1>
            </div>
            <table className="table table-striped">
            <thead>
                    <td>S.no</td>
                    <td>Event Name</td>
                    <td>No. of colleges Enrolled</td>
                    <td>Options</td>
            </thead>
            <tbody>
              {
                data.map((e,index)=>{
                  return(
                  <tr>
                    <td>{index+1}</td>
                    <td>{e.event}</td>
                  <td>{e.count}</td>
                    <td><Link className="btn btn-primary" to={{
                      pathname:"/zonalcoordinator/event/eventcolleges",
                      state:e
                    }} >View</Link></td>
                  </tr>
                  );
                })
              }
            </tbody>    
            </table>   
          </main>
        </div>
      </div>
    </>
  );
}


    

export default EventRegistrationDetails;
