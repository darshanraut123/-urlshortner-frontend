import { useState,useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import {LoadingContext} from '../App';
function Navbar(props) {

  const context  = useContext(LoadingContext);

const navigate = useNavigate();

// console.log(props)
function handleLogout(){
  localStorage.clear();
  navigate('/');
  props.setLogOutBtn(false);
}

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
            <div className="navbar">
              <div>URL Shortner Application</div>
              {props.logoutBtn?<button className="btn btn-danger" onClick={()=>handleLogout()}>Logout</button>:null}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Navbar;
