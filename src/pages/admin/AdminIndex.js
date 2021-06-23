import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";


/* import { useForm } from "react-hook-form"; */

function AdminIndex() { 
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <span className="h3">Dashboard</span>
            <hr />
              <div className="row text-center">
                <div className="col-sm-2">
                  <div className="card">
                    <div className="card-header h4">
                      Games
                    </div>
                    <div className="card-body h1">
                      20
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="card">
                    <div className="card-header h4">
                      Colleges
                    </div>
                    <div className="card-body h1">
                      20
                    </div>
                  </div>
                </div>
              </div>
          </main>
        </div>
      </div>
    </>
  );
}


    

export default AdminIndex;
