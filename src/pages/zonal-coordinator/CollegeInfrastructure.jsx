import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";


/* import { useForm } from "react-hook-form"; */
 import { useState, useEffect } from "react"; 
 import { Link } from "react-router-dom";

function CollegeInfrastructure(props) { 
    const collegeId = props.location.state.id;
    const collegeName=props.location.state.name;
    const httpUrl = "http://3.15.39.76:8000/";
    const [data, setData] = useState([]);
  
    const token = JSON.parse(localStorage.getItem("token"));
    const validToken = token.token_type + " " + token.token;
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: validToken },
    };
    useEffect(() => {
      fetch(httpUrl + "/zonalCoordinator/collegeInfrastructure/"+collegeId, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    }, []);

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <span className="h2">{collegeName}</span>
            </div>
          <div className="row">
                  {data.map((data, index) => {
                    return (
                      <div className="row">
                        <h5>{data.infrastructure_info}</h5>
                        {data.files.map((d, index) => {
                          return (
                            <img onClick={() => openInNewTab(httpUrl + d)}
                              src={httpUrl + d}
                              style={{ maxHeight: "100px", width: "200px" }}
                              alt=""
                            />
                          );
                        })}
                      </div>
                    );
                  })}
             
                  {
                    
                    data[1]===undefined? <h1 className="text-danger text-center">No Infrastructure Data</h1>:console.log(data[1])
                  }

                 
                 
                </div>
          </main>
        </div>
      </div>
    </>
  );
}


    

export default CollegeInfrastructure;
