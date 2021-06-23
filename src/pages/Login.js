import "../css/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
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
        console.log(data["user_type"]);
        if (data["user_type"] === "super_admin") {
          history.push("/superadmin/home");
        } else if (data["user_type"] === "admin") {
          history.push("/admin/home");
        } else if (data["user_type"] === "zonalCoordinator") {
          history.push("/zonalCoordinator");
        } else if (data["user_type"] === "college") {
          history.push("/college/home");
        } else {
            alert('invalid User')
        }

        //  history.push("/college/home");
      });
  };

  return (
    <>
      <div className="new-background">
        <div className="container">
          <div className="space"></div>
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h5 className="card-title text-center">Sign In</h5>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-signin"
                  >
                    <div className="form-label-group">
                      <input
                        id="inputEmail"
                        name="user_id"
                        className="form-control"
                        placeholder="User Id"
                        ref={register({ required: true })}
                      />
                      <label htmlFor="inputEmail">User Id</label>
                    </div>

                    <div className="form-label-group">
                      <input
                        type="password"
                        name="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        ref={register({ required: true })}
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>

                    {/*  <div className="custom-control custom-checkbox mb-3">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" for="customCheck1">Remember password</label>
                            </div> */}
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 mx-auto text-center">
                        <button
                          className="btn btn-lg btn-secondary btn-block text-uppercase"
                          type="submit"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
