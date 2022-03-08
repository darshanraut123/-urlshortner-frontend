import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState , useContext} from "react";
import { LoadingContext } from "../App";
import { Rings } from "react-loader-spinner";

function Login() {
  const { load, setLoad } = useContext(LoadingContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      
      setLoad(true);
      let response = await axios.post(
        "https://url-shortner-app-in.herokuapp.com/api/login",
        values
      );
      setLoad(false);
      if (response.status === 200) {
        response = await response.data;
        localStorage.setItem("authorization", response.token);
        navigate("/convert");
      }
      //203 for verification pending
      //207 wrong password
      //208 email does not exist
      else if (response.status===207||response.status===208||response.status===203) {
        setErrorMessage(response.data.message);
        console.log(response)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter email only").required("Required field"),
      password: Yup.string().required("Requried field"),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return load ? (
    <div className="loadingicon">
      <Rings color="#00BFFF" height={100} width={100} />
    </div>
  ) :(
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 box-container">
          <form className="loginbox" onSubmit={formik.handleSubmit}>
            <div className="head">
              <h2>LOGIN</h2>
              {errorMessage ? (
                <small>{errorMessage}</small>
              ) : (
                <small>Please enter your email and password!</small>
              )}
            </div>
            <div className="inputbody">
              <div className="inputArea">
                <input
                  type="email"
                  value={formik.values.email}
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email ? (
                  <small>{formik.errors.email}</small>
                ) : null}
              </div>

              <div className="inputArea">
                <input
                  type="password"
                  value={formik.values.password}
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password ? (
                  <small>{formik.errors.password}</small>
                ) : null}
              </div>
            </div>
            <div className="foot">
              <button
                type="submit"
                className="btn btn-outline-light"
                name="login"
                id="login"
              >
                Login
              </button>
              <small>
                <Link to="/forgotpassword">Forgot password?</Link>
              </small>
              <div>
                <label>
                  Dont have an account?
                  <Link to="/register">
                    <small>Sign up</small>
                  </Link>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default Login;
