import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

/* import { useForm } from "react-hook-form"; */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "bootstrap";
function College() {

    const [data, setData] = useState([]);
    const httpUrl = "http://3.15.39.76:8000/";
    const token = JSON.parse(localStorage.getItem("token"));
    const validToken = token.token_type + " " + token.token;
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: validToken },
    };
  
    useEffect(() => {
      fetch(httpUrl + "admin/allCollege", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          //data.sort((a, b) => a.zone_no - b.zone_no);
          console.log(data);
          setData(data);
        });
    }, []);

    const resetPassword = (code) =>{

       fetch(httpUrl + "admin/resetCollegePassword/"+code, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      }); 
    }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <span className="h2">Colleges</span>
              <Link className="btn btn-primary float-end" to="/admin/addcollege">
             Add new College
            </Link>
            </div>
            <table className="table table-striped text-center">
            <thead>
              <th>S.no</th>
              <th>College Code</th>
              <th>College Name</th>
              <th>Zone</th>
              <th>Contact Number</th>
              <th>Email</th>
              <th>Options</th>
            </thead>
            <tbody>
             {data.map((d,index)=>{
                 return(
                     <tr>
                         <td>
                            {index+1}
                         </td>
                 <td>{d.code}</td>
                 <td>{d.name}</td>
                 <td>{d.zone_no}--{d.zone_name}</td>
                 <td>{d.contact_number}</td>
                 <td>{d.email}</td>
                 <td><Link to={{pathname:"/admin/editcollege",state:d}}  className="btn btn-warning">Edit</Link>
                <button className="btn btn-warning" onClick={() => {
    const confirmBox = window.confirm(
      "Do you really want to reset password for "+d.name+" ?"
    )
    if (confirmBox === true) {
      resetPassword(d.code)
    }
  }}>Reset Password</button>
  
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

export default College;
