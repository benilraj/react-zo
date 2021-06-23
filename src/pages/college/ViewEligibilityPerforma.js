import "bootstrap/dist/css/bootstrap.min.css";
import AUemblem from "../../images/AUemblem.png";

import { useEffect, useState } from "react";
function ViewEligibilityPerforma(props) {
  const [data, setData] = useState([]);
  const [qrcode, setQr] = useState([]);

   const studentId = props.location.state.key;
   console.log(studentId);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };
  useEffect(() => {
    fetch("http://3.15.39.76:8000/college/eligibilityPerforma/"+studentId, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://3.15.39.76:8000/college/qrcode/"+studentId, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setQr(data);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 text-center"></div>
          <div className="col-sm-3"></div>
        </div>
        <div className="row">
          <div className="col-2">
            <img
              src={AUemblem}
              alt="Emblem"
              className="img-fluid float-end"
              style={{ height: "6rem", paddingBottom: ".5rem" }}
            />
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="text-center" style={{ padding: "unset",width:"80%" }}>Zone No.</td>
                  <td className="text-center" style={{ padding: "unset",width:"20%" }}>{data.zone_no}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-7 text-center">
            <div className="h4">Anna University Sports Board</div>
            <div className="h5 fw-bold">Anna University , Chennai - 25</div>
            <div className="h5 fw-bolder">ELIGIBILITY PROFORMA OF PLAYERS</div>
          </div>
          <div className="col-3">
            <img
              id="frame"
              src={httpUrl + data.candidate_photo}
              className="img-fluid float-end"
              style={{ height: "8rem" }}
            />
          </div>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>1</td>
              <td>Name of Student</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Game</td>
              <td>{data.game_name}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Father's Name</td>
              <td>{data.father_name}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Mother's Name</td>
              <td>{data.mother_name}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Name of the College</td>
              <td>{data.college_name}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Date of Birth and Age</td>
              <td>{data.dob}</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Address for Communication</td>
              <td>
                {data.communication_address}
                <br />
                Mobile : {data.mobile}
                <br />
                LandLine : {data.landline}
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Permanent Residential Address</td>
              <td>{data.permanent_address}</td>
            </tr>
            <tr>
              <td>9</td>
              <td>
                Month and Year of Passing{" "}
                <span className="fw-bolder">+2 / 10 Examination</span>{" "}
              </td>
              <td>{data.month_year_passing}</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Current Course of Study in Anna University</td>
              <td>
                1. UG / PG : {data.current_course}
                <br />
                2. Year : {data.current_year}
                <br />
                3. Branch : {data.current_branch}
              </td>
            </tr>
            <tr>
              <td>11</td>
              <td>Anna University Examination Registration No.</td>
              <td>{data.registration_no}</td>
            </tr>
            {data.current_course==="PG" ? 
            <tr>
              <td>12</td>
              <td>
                Details of UG Study
                <br />
                (for PG Students)
              </td>
              <td>
                Name of Programme : {data.ug_course}
                <br />
                College of Study : {data.ug_college}
                <br />
                Year of Admission : {data.ug_year_admission}
                <br />
                Year of Completion : {data.ug_year_completion}
              </td>
            </tr>
:""}
            <tr>
              <td>13</td>
              <td>Period of Break in Study (if any) </td>
              <td>{data.period_break}</td>
            </tr>
            <tr>
              <td>14</td>
              <td>Details of Earlier representation in University Team *</td>
              <td>{data.earlier_representation_in_university_team}</td>
            </tr>
            <tr>
              <td>15</td>
              <td>Details of Participation in University team *</td>
              <td>
                {
                  data.details_of_participation_in_national_international_tournaments
                }
              </td>
            </tr>
            <tr>
              <td>16</td>
              <td>Size of Uniform</td>
              <td>{data.uniform_size}</td>
            </tr>
          </tbody>
        </table>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td className="float-end">
                Signature of Student
              </td>
            </tr>
            <tr>
              <td className="float-start">Signature of Principal</td>
              <td className="text-center">
            
                College Seal
              </td>
              <td className="float-end">
            
                Signature of DPE
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mb-5">
          <h6>Enclosure:</h6>
          <div style={{ paddingLeft: "5rem" }}>
            {data.attested12 !== "" ? (
              <p>(i)Attested Copy of the +2 Marksheet / Diploma Certificate</p>
            ) : (
              " "
            )}
            {data.attested_marksheet !== "" ? (
              <p>
                (ii) Attested copy of the AU Examination Hall Ticket / fee
                recipt for I year / recently received Semester Mark Sheet
              </p>
            ) : (
              " "
            )}
            {data.attested_degree !== null ? (
              <p>
                (iii) Attested copy of the degree certificate in case of PG
                students
              </p>
            ) : (
              " "
            )}
            {data.attested_form !== null ? (
              <p>(iV) Attested copy of Form III / II / I</p>
            ) : (
              " "
            )}
          </div>
        </div>

        <div className="row justify-content-center mb-5">
          <h6>QR Verification Code:</h6>
          <div className="col-4">
            <div dangerouslySetInnerHTML={{ __html: qrcode }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewEligibilityPerforma;
