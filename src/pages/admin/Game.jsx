import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

/* import { useForm } from "react-hook-form"; */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function Game() {

     const [data, setData] = useState([]);
    const httpUrl = "http://3.15.39.76:8000/";
    const token = JSON.parse(localStorage.getItem("token"));
    const validToken = token.token_type + " " + token.token;
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: validToken },
    };
  
    useEffect(() => {
      fetch(httpUrl + "admin/allGames", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //data.sort((a, b) => a.zone_no - b.zone_no);
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
              <span className="h2">Games</span>
              <Link className="btn btn-primary float-end" to="/admin/addgame">
             Add new Game
            </Link>
            </div>
            <table className="table table-striped text-center">
            <thead>
              <th>S.no</th>
              <th>Name</th>
              <th>Number of Players</th>
              <th>I<sup>st</sup> Place score</th>
              <th>II<sup>nd</sup> Place score</th>
              <th>III<sup>rd</sup> Place score</th>
              <th style={{width: '40%'}}>Instructions</th>
              <th>Options</th>
            </thead>
            <tbody>
            {data.map((d,index)=>{
                return(
                    <tr>
                        <td>{index+1}</td>
                <td>{d.name}</td>
                <td>{d.number_of_players}</td>
                <td>{d.score1}</td>
                <td>{d.score2}</td>
                <td>{d.score3}</td>
                <td>{d.instructions}</td>
                <td> <Link to={{
                                pathname:"/admin/editgame",
                                state:d
                            }}  className="btn btn-warning">
                              Edit
                            </Link></td>
                    </tr>
                )
            })}
            </tbody>
            </table>

          </main>
        </div>
      </div>
    </>
  );
}

export default Game;
