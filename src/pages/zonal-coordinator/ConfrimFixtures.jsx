import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";


/* import { useForm } from "react-hook-form"; */
/* import { useState, useEffect } from "react"; */
/* import {Link } from "react-router-dom";  */

function ConfrimFixtures(props) { 
    let fixtures=props.location.state.fixtures;
    console.log('fixtures');
    console.log(fixtures);
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
           
          </main>
        </div>
      </div>
    </>
  );
}


    

export default ConfrimFixtures;
