import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";

import {Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
function Header() {


  const [data, setData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "zonalCoordinator/zoneInfo/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const logout=()=>{
    localStorage.clear();
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-sm-2 col-md-2 mr-0" to="/">Sports Board</Link>
                <div className="col-sm-9 text-light">
                  Zone : {data.zone_no} -- {data.zone_name}
                </div>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                          <Link className="nav-link" onClick={logout} to="/">Sign out</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    </>
  );
}

export default Header;
