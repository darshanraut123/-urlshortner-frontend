import { useState } from "react";

function Email({emailMessage}) {

    return (
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 box-container">
              <div className="head">
                <h2>{emailMessage}</h2>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      );
}

export default Email;