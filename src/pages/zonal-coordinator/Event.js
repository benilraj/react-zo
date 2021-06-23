import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Event() {
  const httpUrl = "http://3.15.39.76:8000/";
  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "/zonalCoordinator/games/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setData(data);
      });
  }, []);

  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    fetch(httpUrl + "/zonalCoordinator/events", requestOptions)
      .then((response) => response.json())
      .then((eventData) => {
       // console.log(eventData);
        setEventData(eventData);
      });
  }, []);


  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit =values => {
    const requestOptionsPost = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: validToken },
        body:JSON.stringify(values)
      };
    fetch(httpUrl + "/zonalCoordinator/createEvent", requestOptionsPost)
    .then((response) => response.json())
    .then((result) => {
        console.log(result['message']);
        if(result['message']==="CREATED")
        {
            window.location.reload(false);
        }
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
              <h1 className="h2">Initiate Event / Games</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <label htmlFor="eventName">Name of the Event</label>
                  <br />
                  <select name="game_id" className="form-control" id="" ref={register}>
                    {data.map((game) => {
                      return <option value={game.id}>{game.name}</option>;
                    })}
                  </select>
                </div>
                <div className="col-sm-4">
                  <label htmlFor="period">Period of the tournament</label>
                  <div className="row">
                    <div className="col-sm-5">
                      <input
                        type="date"
                        name="period_from"
                        className="form-control"
                        id="periodStart"
                        style={{ paddingLeft: "unset", paddingRight: "unset" }}
                        ref={register({ required: true })}
                      />
                    </div>
                    <div className="col-sm-1 fw-bold">to</div>
                    <div className="col-sm-5">
                      <input
                        type="date"
                        name="period_to"
                        className="form-control"
                        id="periodEnd"
                        style={{ paddingLeft: "unset", paddingRight: "unset" }}
                        ref={register({ required: true })}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <label htmlFor="last_date">Last date for Enrollment</label>
                  <br />
                  <input
                    type="date"
                    name="last_date_enrollment"
                    className="form-control"
                    id="last_date"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                <label htmlFor="venue">Venue of the tournament</label>
                  <input
                    type="text"
                    name="venue"
                    className="form-control"
                    id="venue"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <span className="h6 mb-1">Local Sports Coordinator</span>
                <div className="col-sm-1 text-center">
                  <label htmlFor="coordinatorName"></label> Name
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="local_sports_coordinator_name"
                    id="coordinatorName"
                    className="form-control"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="col-sm-1 text-center">
                  <label htmlFor="coordinatorName"></label> Contact Number
                </div>
                <div className="col-sm-5">
                  <input
                    type="number"
                    name="local_sports_coordinator_number"
                    id="coordinatorNumber"
                    className="form-control"
                    ref={register({ required: true })}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <span className="h6 mb-1">Local Sports Secretary</span>
                <div className="col-sm-1 text-center">
                  <label htmlFor="secetaryName"></label> Name
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="local_sports_secetary_name"
                    id="secetaryName"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
                <div className="col-sm-1 text-center">
                  <label htmlFor="secetaryNumber"></label> Contact Number
                </div>
                <div className="col-sm-5">
                  <input
                    type="number"
                    name="local_sports_secetary_contact_number"
                    id="secetaryNumber"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
              </div>
              <div className="row mb-2">
                <span className="h6 mb-1">Zonal Selection Commity</span>
                <div className="col-sm-1 text-center">
                  <label htmlFor="commity1Name"></label> Name
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="selection_commity1_name"
                    id="commity1Name"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
                <div className="col-sm-1 text-center">
                  <label htmlFor="commity1Number"></label> Contact Number
                </div>
                <div className="col-sm-5">
                  <input
                    type="number"
                    name="selection_commity1_contact_number"
                    id="commity1Number"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-1 text-center">
                  <label htmlFor="commity2Name"></label> Name
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="selection_commity2_name"
                    id="commity2Name"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
                <div className="col-sm-1 text-center">
                  <label htmlFor="commity2Number"></label> Contact Number
                </div>
                <div className="col-sm-5">
                  <input
                    type="number"
                    name="selection_commity2_contact_number"
                    id="commity2Number"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-1 text-center">
                  <label htmlFor="commity3Name"></label> Name
                </div>
                <div className="col-sm-5">
                  <input
                    type="text"
                    name="selection_commity3_name"
                    id="commity3Name"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
                <div className="col-sm-1 text-center">
                  <label htmlFor="commity3Number"></label> Contact Number
                </div>
                <div className="col-sm-5">
                  <input
                    type="number"
                    name="selection_commity3_contact_number"
                    id="commity3Number"
                    className="form-control"
                    ref={register({ required: true })}

                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10"></div>
                <div className="col-sm-2 d-grid gap-1">
                  <button type="submit" className="btn btn-secondary">Submit</button>
                </div>
              </div>
            </form>
            <div id="">
              <div className="text-center">SCHEDULE OF ZONAL SPORTS EVENTS</div>
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Sl.no</th>
                        <th>Name of the Event</th>
                        <th>Period of the tournament</th>
                        <th>Venue of the Tournament</th>
                        <th>Local Sports Coordinator</th>
                        <th>Local Sports Secretary</th>
                        <th>Commity Members</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventData.map((e, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{e.game_name}</td>
                            <td>
                              {e.period_from}{" "}
                              <span className="text-danger">to</span>{" "}
                              {e.period_to}
                            </td>
                            <td>{e.venue}</td>
                            <td>
                              {e.local_sports_coordinator_name}
                              <br />
                              {e.local_sports_coordinator_number}
                            </td>
                            <td>
                              {e.local_sports_secetary_name}
                              <br />
                              {e.local_sports_secetary_contact_number}
                            </td>
                            <td>
                              {e.selection_commity1_name}
                              <br />
                              {e.selection_commity1_contact_number}
                              <br />
                              {e.selection_commity2_name}
                              <br />
                              {e.selection_commity2_contact_number}
                              <br />
                              {e.selection_commity3_name}
                              <br />
                              {e.selection_commity3_contact_number}
                              <br />
                            </td>
                            <td>
                            <Link to={{
                                pathname:"/zonalcoordinator/changeevent",
                                state:e
                            }}  className="btn btn-warning">
                              Edit
                            </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Event;
