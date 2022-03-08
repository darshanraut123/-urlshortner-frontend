import {useNavigate} from 'react-router-dom';
import "./navbar.css";
function Navbar(props) {


const navigate = useNavigate();

function handleLogout(){
  localStorage.clear();
  navigate('/');
  props.setLogOutBtn(false);
}

  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-12">
            <div className="navbar">
              <div>URL Shortener Application</div>
              {props.logoutBtn?<button className="btn btn-danger" onClick={()=>handleLogout()}>Logout</button>:null}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Navbar;
