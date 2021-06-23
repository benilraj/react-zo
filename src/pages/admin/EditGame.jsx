import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function EditGame(props) {
    const game = props.location.state;
    console.log(game);
  const [data, setData] = useState([]);
  const httpUrl = "http://3.15.39.76:8000/";
  const token = JSON.parse(localStorage.getItem("token"));
  const validToken = token.token_type + " " + token.token;
  const requestOptions = {
    method: "get",
    headers: { "Content-Type": "application/json", Authorization: validToken },
  };

  useEffect(() => {
    fetch(httpUrl + "admin/allZones", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //data.sort((a, b) => a.zone_no - b.zone_no);
        console.log(data);
        setData(data);
      });
  }, []);

  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
      data.id=game.id;
    console.log(data);
     const requestOptionsPut = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: validToken,
      },
      body: JSON.stringify(data),
    };
    fetch(httpUrl + "admin/editGame/", requestOptionsPut)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["message"] === "UPDATED") {
          history.push("/admin/games");
        } else {
          alert(JSON.stringify(data));
        }
      }); 
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <span className="h2">Add new Game</span>
            </div>
            <div className="container-fluid">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="gameName">Name of the game</label>
                    <input
                      type="text"
                      id="gameName"
                      name="name"
                      className="form-control"
                      defaultValue={game.name}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="playerCount">Number of Players</label>
                    <input
                      type="text"
                      className="form-control"
                      id="playerCount"
                      name="number_of_players"
                      defaultValue={game.number_of_players}
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <span className="fw-bold">Score Pattern</span>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <label htmlFor="firstPlace">
                      I<sup>st</sup> Place
                    </label>
                    <input
                      type="number"
                      name="score1"
                      id="firstPlace"
                      defaultValue={game.score1}
                      className="form-control"
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="secondPlace">
                      II<sup>st</sup> Place
                    </label>
                    <input
                      type="number"
                      name="score2"
                      id="secondPlace"
                      defaultValue={game.score2}
                      className="form-control"
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="thirdPlace">
                      III<sup>st</sup> Place
                    </label>
                    <input
                      type="number"
                      name="score3"
                      id="thirdPlace"
                      defaultValue={game.score3}
                      className="form-control"
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="instructions">Instructions</label>
                  <div className="col-sm-12 mb-3">
                    <textarea
                      name="instructions"
                      id=""
                      rows="5"
                      className="form-control"
                      defaultValue={game.instructions}
                      ref={register({ required: true })}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-10"></div>
                  <div className="col-sm-2 d-grid gap-1">
                    <button type="submit" className="btn btn-primary ">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default EditGame;
