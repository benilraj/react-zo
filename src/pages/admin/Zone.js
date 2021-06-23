import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; 

function Zone() { 

    const httpUrl = "http://3.15.39.76:8000/";
    const [data, setData] = useState([]);
    const [formClass, setFormClass] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));
    const validToken = token.token_type + " " + token.token;
  
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        const requestOptionsPost = {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: validToken },
            body:JSON.stringify(data)
        };
        
            fetch(httpUrl + "admin/createZone/", requestOptionsPost)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if(data['message']==="CREATED")
                {
                    window.location.reload(false);
                }
                else{
                    alert(JSON.stringify(data));
                }
              });
    };

    const requestOptions = {
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: validToken },
      };
    
      useEffect(() => {
        fetch(httpUrl+"admin/allZones", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            data.sort((a, b) => a.zone_no - b.zone_no)
            console.log(data);
            setData(data);
            setFormClass("container d-none");
          });
      }, []);

    
      const showForm=()=>{
      setFormClass("container");
      }
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Zones</h1>
              <button className="btn btn-primary" onClick={showForm}>Add Zone</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}  className={formClass}>
            <div className="row mb-4">
                <div className="col-6">
                    Zone No:
                    <input type="number" className="form-control" name="zone_no" ref={register} id=""/>
                </div>
                <div className="col-6">
                    Zone Name:
                    <input type="text" className="form-control" name="zone_name" ref={register} id=""/>
                </div>
            </div>
            <div className="row float-end">
                    <button type="submit" className="btn btn-lg btn-primary">Submit</button>
            </div>
            </form>

            <table className="table table-striped text-center">
                <thead>
                    <th>Zone No</th>
                    <th>Zone Name</th>
                </thead>
                <tbody>
                    {
                        data.map((d)=>{
                            return(
                                <tr>
                                    <td>{d.zone_no}</td>
                                    <td>{d.zone_name}</td>
                                </tr>
                            );
                        }
                        )
                    }
                </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
}


    

export default Zone;
