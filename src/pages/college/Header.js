import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";

import {Link } from "react-router-dom"; 

function Header() {
   /* const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://3.15.39.76:8000/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data));
      });
  };  */

  const logout=()=>{
    localStorage.clear();
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12">
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Sports Board</Link>
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
