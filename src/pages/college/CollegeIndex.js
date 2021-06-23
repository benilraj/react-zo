import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { useState, useEffect, Component } from "react";

/* import { useForm } from "react-hook-form"; */

function CollegeIndex() {
  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };

  useEffect(() => {
    fetch("http://3.15.39.76:8000/college/events", requestOptions)
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
              <span className="h3">Current games Being Hosted</span>
            </div>
            <div className="row">
              {data.map((d) => {
                  let fromDay=new Date(d.period_from).getDate();
                  let fromMonth=new Date(d.period_from).getMonth()+1;
                  let fromYear=new Date(d.period_from).getFullYear();

                  let toDay=new Date(d.period_to).getDate();
                  let toMonth=new Date(d.period_to).getMonth()+1;
                  let toYear=new Date(d.period_to).getFullYear();
    
                return (
                  <Link to={{
                      pathname:"game",
                      state:d
                  }}  className="col-sm-3 tile">
                   <span >{d.game_name} </span> 
                    <hr/>
                  < span class="fw-bold">{fromDay+"-"+fromMonth+"-"+fromYear}</ span>  <span className="text-danger"> to </span> <span class="fw-bold">{toDay+"-"+toMonth+"-"+toYear}</span>
                    <hr/>
                  <span>{d.venue} </span>  
                  </Link>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default CollegeIndex;
