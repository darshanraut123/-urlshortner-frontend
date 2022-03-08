import { Link, useParams,useNavigate } from "react-router-dom";
import "./home.css";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../App";
import { Rings } from "react-loader-spinner";
import axios from "axios";



function EmailVerify() {
    const { load, setLoad } = useContext(LoadingContext);
    const [verificationMessage, setVerificationMessage] = useState("");
     const {token} = useParams();
    const navigate = useNavigate();

     useEffect(()=>{

        handleVerify();

     },[])
    

    
async function handleVerify() {
  try {
    setLoad(true);
    if (!token) {
      setLoad(false);
      setVerificationMessage("No token found!!!");

    } else {
      const response = await axios.get(
        `https://url-shortner-app-in.herokuapp.com/api/verify/${token}`
        );
        setLoad(false);
      if (response.status === 200){
        setVerificationMessage(response.data.response);
        setVerificationMessage(
          "Verification Success!!! You will be redirected to login page in 5 seconds..."
        );
        setTimeout(() => {
          navigate("/");
        }, 5000);
        setLoad(false);
      }
     }
  } catch (err) {
    console.log(err.message);
    setLoad(false);
    setVerificationMessage("Verification Unsuccessful!!!");
  }
}
    
    return load ? (
      <div className="loadingicon">
        <Rings color="#00BFFF" height={100} width={100} />
      </div>
    ) : (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 box-container">
            <h2>{verificationMessage}</h2>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col">
          <Link to="/" style={{color:"whitesmoke"}}>GOTO SIGN IN</Link><br/>
          <Link to="/register" style={{color:"whitesmoke"}}>GOTO REGISTER</Link>
          </div>
        </div>
      </div>
    );
}

export default EmailVerify;

// https://url-shortner-app-in.herokuapp.com/api/verify/${verificationToken}


