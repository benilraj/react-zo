import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


import AUemblem from "../../images/AUemblem.png";

import { useEffect, useState } from "react";

function EligibilityPerforma(props) {
  //gets event_id from previous page
  const eventId = props.location.state;
  console.log(eventId);
  let history = useHistory();
  const httpUrl = "http://3.15.39.76:8000/";


  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log('working');
    console.log(data.candidatePhoto);
    data.candidatePhoto=data.candidatePhoto[0];
    data.attested12=data.attested12[0];
    data.attestedMarksheet=data.attestedMarksheet[0];
    if(watch("currentCourse")=="PG"){
      data.attestedDegree=data.attestedDegree[0];
      data.attestedForm=data.attestedForm[0];
    }
    else{

    }
    
    
    data.eventId=eventId;

    console.log(data.candidatePhoto);

    var form_data = new FormData();

    for ( var key in data ) {
        form_data.append(key, data[key]);
    }
    
    

     const requestOptionsPost = {
      method: "POST",
      headers: { Authorization: validToken },
      body: form_data,
    };
  
      fetch(httpUrl + "college/eligibilityPerforma/", requestOptionsPost)
        .then((response) => response.json())
        .then((data) => {
          console.log('before_submit');
          console.log(data);
           if(data.message=="CREATED"){
          history.push({
            pathname:"/college/eligibilityperforma/view",
            state:{
                key:data['student']
             }
           });
          console.log("after submit");}
          else{
            console.log('after errror');
            console.log(data);
            alert(JSON.stringify(data));
          } 
        });
     

  };

  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch(httpUrl + "/college/gameCollege/" + eventId, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);


 

  return (
    <div className="container h6 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td>
                <img
                  src={AUemblem}
                  alt="Emblem"
                  className="img-fluid float-end"
                  style={{ height: "10rem", paddingBottom: ".5rem" }}
                />
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td style={{ padding: ".3rem" }}>Zone No.</td>
                      <td style={{ padding: ".3rem" }}>{data.zone_no}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="text-center pt-5">
                <div className="h4">Anna University Sports Board</div>
                <div className="h5 fw-bold">Anna University , Chennai - 25</div>
                <div className="h5 fw-bolder">
                  ELIGIBILITY PROFORMA OF PLAYERS
                </div>
              </td>
              <td className="text-center">
                {watch("candidatePhoto") ? console.log(watch("candidatePhoto")) : console.log("empty")} 
                {watch("candidatePhoto") ? 
                  watch("candidatePhoto")[0]!==undefined  ?
                  <img
                      src= {URL.createObjectURL(watch("candidatePhoto")[0])}
                      alt=" "
                      style={{height:"10rem"}}
                    />: <div style={{paddingTop:"9rem"}} className="text-start">Candidate Photo</div>
                 : 
                  ""
                } 
                <input
                  type="file"
                  className="form-control"
                  name="candidatePhoto"
                  id=""
                  ref={register({ required: true })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>1</td>
              <td>Name of Student</td>
              <td>
                <input
                  type="text"
                  name="name"
                  id=""
                  className="form-control"
                  ref={register({ required: true })}
                />
                {errors.name && (
                  <span className="text-danger">Name is Required</span>
                )}
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Game</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Father's Name</td>
              <td>
                <input
                  type="text"
                  name="fatherName"
                  id=""
                  className="form-control"
                  ref={register({ required: true })}
                />
                {errors.fatherName && (
                  <span className="text-danger">Father's Name is Required</span>
                )}
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Mother's Name</td>
              <td>
                <input
                  type="text"
                  name="motherName"
                  id=""
                  className="form-control"
                  ref={register({ required: true })}
                />
                {errors.motherName && (
                  <span className="text-danger">Mother's Name is Required</span>
                )}
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Name of the College</td>
              <td>{data.college_name}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Date of Birth and Age</td>
              <td>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  id=""
                  ref={register({ required: true })}
                />
                {errors.dob && (
                  <span className="text-danger">
                    {" "}
                    Date of Birth is Required
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Address for Communication</td>
              <td>
                <textarea
                  name="communicationAddress"
                  id=""
                  rows="4"
                  className="form-control"
                  ref={register({ required: true })}
                ></textarea>
                {errors.addressCommunication && (
                  <span className="text-danger">
                    Address for Communication is Required
                  </span>
                )}
                <br />
                Mobile :{" "}
                <input
                  type="text"
                  name="mobile"
                  id=""
                  className="form-control"
                  ref={register({ required: true })}
                />
                {errors.mobile && (
                  <span className="text-danger">Mobile Number is Required</span>
                )}
                <br />
                LandLine :{" "}
                <input
                  type="text"
                  name="landline"
                  id=""
                  className="form-control"
                  ref={register}
                />
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Permanent Residential Address</td>
              <td>
                <textarea
                  name="permanentAddress"
                  id=""
                  rows="4"
                  className="form-control"
                  ref={register({ required: true })}
                ></textarea>
                {errors.permanentAddress && (
                  <span className="text-danger">
                    Permanent Address is Required
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                Month and Year of Passing{" "}
                <span className="fw-bolder">+2 / 10 Examination</span>{" "}
              </td>
              <td>
                <input
                  type="month"
                  name="monthYearPassing"
                  id=""
                  className="form-control"
                  ref={register({ required: true })}
                />
                {errors.monthYearPassing && (
                  <span className="text-danger">
                    Month and Year of Passing is Required
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>Current Course of Study in Anna University</td>
              <td>
                1. UG / PG :{" "}
                <select
                  name="currentCourse"
                  id=""
                  className="form-control"
                  ref={register({ required: true })}
                >
                  <option value="UG">UG</option>
                  <option value="PG">PG</option>
                </select>
                {errors.currentCourse && (
                  <span className="text-danger">
                    Current Course is Required
                  </span>
                )}
                <br />
                2. Year :{" "}
                <select
                  name="currentYear"
                  id=""
                  className="form-control"
                  ref={register({ required: true })}
                >
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="4">IV</option>
                </select>
                {errors.currentYear && (
                  <span className="text-danger">Year is Required</span>
                )}
                <br />
                3. Branch :{" "}
                <input
                  type="text"
                  name="currentBranch"
                  className="form-control"
                  ref={register({ required: true })}
                />
                {errors.currentBranch && (
                  <span className="text-danger">Branch is Required</span>
                )}
              </td>
            </tr>
            <tr>
              <td>11</td>
              <td>Anna University Examination Registration No.</td>
              <td>
                <input
                  type="text"
                  name="regNo"
                  className="form-control"
                  ref={register({ required: true })}
                />
                {errors.regNo && (
                  <span className="text-danger">
                    Permanent Address is Required
                  </span>
                )}
              </td>
            </tr>

{watch("currentCourse")=="PG" ? (
            <tr>
              <td>12</td>
              <td>
                Details of UG Study
                <br />
                (for PG Students)
              </td>
              <td>
                Name of Programme :
                <input
                  type="text"
                  name="ugCourse"
                  className="form-control disabled"
                  ref={register}
                />
                <br />
                College of Study :
                <input
                  type="text"
                  name="ugCollege"
                  className="form-control"
                  ref={register}
                />
                <br />
                Year of Admission :
                <input
                  type="number"
                  className="form-control"
                  name="ugYearAdmission"
                  ref={register({ maxLength: 4 })}
                />
                <br />
                Year of Completion :
                <input
                  type="number"
                  className="form-control"
                  name="ugYearCompletion"
                  ref={register}
                />
              </td>
            </tr>
            ): " "}
            <tr>
              <td>13</td>
              <td>Period of Break in Study (if any) </td>
              <td>
                <input
                  type="number"
                  name="periodBreak"
                  id=""
                  className="form-control"
                  ref={register}
                />
              </td>
            </tr>
            <tr>
              <td>14</td>
              <td>Details of Earlier representation in University Team *</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="earlierRepresentationInUniversityTeam"
                  ref={register}
                />
              </td>
            </tr>
            <tr>
              <td>15</td>
              <td>Details of Participation in University team *</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="detailsOfParticipation"
                  ref={register}
                />
              </td>
            </tr>
            <tr>
              <td>16</td>
              <td>Size of Uniform</td>
              <td>
                <div
                  className="btn-group form-control"
                  role="group"
                  aria-label="Basic radio toggle button group"
                >
                  <input
                    type="radio"
                    className="btn-check"
                    name="uniformSize"
                    id="btnradio1"
                    autoComplete="off"
                    ref={register({ required: true })}
                    value="36"
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio1"
                  >
                    36
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="uniformSize"
                    id="btnradio2"
                    autoComplete="off"
                    ref={register({ required: true })}
                    value="38"
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio2"
                  >
                    38
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="uniformSize"
                    id="btnradio3"
                    autoComplete="off"
                    ref={register({ required: true })}
                    value="40"
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio3"
                  >
                    40
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="uniformSize"
                    id="btnradio4"
                    autoComplete="off"
                    ref={register({ required: true })}
                    value="42"
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio4"
                  >
                    42
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="uniformSize"
                    id="btnradio5"
                    autoComplete="off"
                    ref={register({ required: true })}
                    value="44"
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio5"
                  >
                    44
                  </label>
                  <input
                    type="radio"
                    className="btn-check"
                    name="uniformSize"
                    id="btnradio6"
                    autoComplete="off"
                    ref={register({ required: true })}
                    value="46"
                  />
                  <label
                    className="btn btn-outline-secondary"
                    htmlFor="btnradio6"
                  >
                    46
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="float-end">
                <button type="submit" className="btn btn-lg btn-primary">
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <h5>Enclosure:</h5>
        <p>(i)Attested Copy of the +2 Marksheet / Diploma Certificate</p>
        {watch("attested12") ? console.log(watch("attedted12")) : console.log("empty")} 
                {watch("attested12") ? 
                  watch("attested12")[0]!==undefined  ?
                  <img
                      src= {URL.createObjectURL(watch("attested12")[0])}
                      alt=" "
                      style={{height:"10rem"}}
                    />: " "
                 : 
                  ""
                } 
        <input
          type="file"
          name="attested12"
          className="form-control"
          id=""
          ref={register({ required: true })}
        />
        <p>
          (ii) Attested copy of the AU Examination Hall Ticket / fee recipt for
          I year / recently received Semester Mark Sheet
        </p>
        {watch("attestedMarksheet") ? console.log(watch("attestedMarksheet")) : console.log("empty")} 
                {watch("attestedMarksheet") ? 
                  watch("attestedMarksheet")[0]!==undefined  ?
                  <img
                      src= {URL.createObjectURL(watch("attestedMarksheet")[0])}
                      alt=" "
                      style={{height:"10rem"}}
                    />: " "
                 : 
                  ""
                }
        
        <input
          type="file"
          name="attestedMarksheet"
          className="form-control"
          id=""
          ref={register({ required: true })}
        />
      
      {watch("currentCourse")=="PG" ? (   
        <p>
          (iii) Attested copy of the degree certificate in case of PG students
        </p>
      ) : ""}
        {watch("attestedDegree") ? console.log(watch("attestedDegree")) : console.log("empty")} 
                {watch("attestedDegree") ? 
                  watch("attestedDegree")[0]!==undefined  ?
                  <img
                      src= {URL.createObjectURL(watch("attestedDegree")[0])}
                      alt=" "
                      style={{height:"10rem"}}
                    />: " "
                 : 
                  ""
                } 
                      {watch("currentCourse")=="PG" ? (   

        <input
          type="file"
          name="attestedDegree"
          className="form-control"
          id=""
          ref={register}
        />
        ):""}
                              {watch("currentCourse")=="PG" ? (   

        <p>(iV) Attested copy of Form III / II / I</p>
                              ):" "}

        {watch("attestedForm") ? console.log(watch("attestedForm")) : console.log("empty")} 
                {watch("attestedForm") ? 
                  watch("attestedForm")[0]!==undefined  ?
                  <img
                      src= {URL.createObjectURL(watch("attestedForm")[0])}
                      alt=" "
                      style={{height:"10rem"}}
                    />: " "
                 : 
                  ""
                } 
                                      {watch("currentCourse")=="PG" ? (   
        <input
          type="file"
          name="attestedForm"
          className="form-control"
          id=""
          ref={register}
        />
                                      ):" "}
      </form>
    </div>
  );
}

export default EligibilityPerforma;
