import QrReader from "react-qr-scanner";
import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { useHistory } from "react-router-dom";

function QrScanner() {
  let history = useHistory();
  function showResult(result) {
    if (result != null) {
      console.log(result.text);
      history.push({
        pathname: "/zonalCoordinator/verify",
        state: { id: result.text },
      });
    }
  }

  function showError(result) {
    console.log(result);
  }

  const previewStyle = {
    height: 700,
    width: 1000,
    display: "flex",
    justifyContent: "center",
  };
  const camStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "-50px",
  };

  const textStyle = {
    fontSize: "30px",
    textAlign: "center",
    marginTop: "-50px",
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Navigation />
          <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
            <React.Fragment>
              <div style={camStyle}>
                <QrReader
                  style={previewStyle}
                  delay={100}
                  onScan={showResult}
                  onError={showError}
                />
              </div>
              <p style={textStyle}></p>
            </React.Fragment>
          </main>
        </div>
      </div>
    </>
  );
}

export default QrScanner;
