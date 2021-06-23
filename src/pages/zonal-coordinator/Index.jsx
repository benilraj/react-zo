import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/CollegeIndex.css";
import "../../css/Admin.css";
import Header from "./Header";
import Navigation from "./Navigation";


/* import { useForm } from "react-hook-form"; */

function Index() { 
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <span className="h3">Dashboard</span>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <div className="card">
                  <div className="card-header h4">
                    Number of Colleges on Zone 
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


    

export default Index;
