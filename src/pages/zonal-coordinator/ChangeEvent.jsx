import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
function ChangeEvent(props) {
  const event=props.location.state;
  const httpUrl = "http://3.15.39.76:8000/";
  const [data, setData] = useState([]);
  let history = useHistory();
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
      values.id=event.id;
    const requestOptionsPut = {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: validToken },
        body:JSON.stringify(values)
      };
    fetch(httpUrl + "/zonalCoordinator/editEvent", requestOptionsPut)
    .then((response) => response.json())
    .then((result) => {
        console.log(result['message']);
        if(result['message']==="UPDATED")
        {
            history.push("/zonalCoordinator/event");
        }
        else{
            alert(JSON.stringify(result));
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
              <h1 className="h2">Edit Event Details</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <label htmlFor="eventName">Name of the Event</label>
                  <br />
                  <select name="game_id" className="form-control" id="" ref={register}>
                    {data.map((game) => {
                        return(
                        game.id==event.game_id?
                       <option value={game.id} selected>{game.name}</option>
                      :
                      <option value={game.id}>{game.name}</option>
                        )
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
                        defaultValue={event.period_from}
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
                        defaultValue={event.period_to}
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
                    defaultValue={event.last_date_enrollment}
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
                    defaultValue={event.venue}
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
                    defaultValue={event.local_sports_coordinator_name}
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
                    defaultValue={event.local_sports_coordinator_number}
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
                    defaultValue={event.local_sports_secetary_name}
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
                    defaultValue={event.local_sports_secetary_contact_number}
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
                    defaultValue={event.selection_commity1_name}
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
                    defaultValue={event.selection_commity1_contact_number}
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
                    defaultValue={event.selection_commity2_name}
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
                    defaultValue={event.selection_commity2_contact_number}
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
                    defaultValue={event.selection_commity3_name}
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
                    defaultValue={event.selection_commity3_contact_number}
                    ref={register({ required: true })}

                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-10"></div>
                <div className="col-sm-2 d-grid gap-1">
                  <button type="submit" className="btn btn-secondary">Update</button>
                </div>
              </div>
            </form>
         
          </main>
        </div>
      </div>
    </>
  );
}

export default ChangeEvent;
