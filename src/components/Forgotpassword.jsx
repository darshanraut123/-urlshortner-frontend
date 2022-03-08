import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./home.css";
import { useState , useContext} from "react";
import { LoadingContext } from "../App";
import { Rings } from "react-loader-spinner";


function Forgotpassword() {
  const { load, setLoad } = useContext(LoadingContext);
  const [info, setInfo] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      birthyear: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Should be an email")
        .min(5, "Min 5 chars")
        .max(40, "Max 40 chars")
        .required("required"),
      birthyear: Yup.number()
        .min(1800, "Should be more than year 1800")
        .max(2022, "Should be less than year 2022")
        .required("required"),
      password: Yup.string().required("required"),
      cpassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      handleForgotPassword(values);
    },
  });

  async function handleForgotPassword({ email, password, birthyear }) {
    try {
      setLoad(true);
      const response = await axios.post(
        "https://url-shortner-app-in.herokuapp.com/api/forgotPassword",
        { email, password, birthyear }
      );
      setLoad(false);
      setInfo("Please enter your details to proceed!");
      //200 password changed
      //201 email not present please register
      //202 email present but birth guess is wrong

      if (response.status === 200) {
        setInfo(response.data.message);
        formik.resetForm();
      } else if (response.status === 201 || response.status === 202) {
        setInfo(response.data.message);
      }
    } catch (err) {
      setLoad(false);
      console.log(err.message);
    }
  }

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
              <h2>RESET PASSWORD</h2>
              {info ? (
                <small>{info}</small>
              ) : (
                <small>Please enter your details to proceed!</small>
              )}
            </div>
            <div className="inputbody">
              <div className="inputArea">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email ? (
                  <small>{formik.errors.email}</small>
                ) : null}
              </div>

              <div className="inputArea">
                <input
                  placeholder="Enter date of birth year"
                  type="number"
                  name="birthyear"
                  value={formik.values.birthyear}
                  onChange={formik.handleChange}
                />
                {formik.errors.birthyear ? (
                  <small>{formik.errors.birthyear}</small>
                ) : null}
              </div>

              <div className="inputArea">
                <input
                  type="password"
                  placeholder="New password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password ? (
                  <small>{formik.errors.password}</small>
                ) : null}
              </div>

              <div className="inputArea">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  name="cpassword"
                  value={formik.values.cpassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.cpassword ? (
                  <small>{formik.errors.cpassword}</small>
                ) : null}
              </div>
            </div>
            <div className="foot">
              <button type="submit" className="btn btn-outline-light">
                Reset
              </button>
              <div>
                <label>
                  Remember password?<Link to="/"> Login here</Link>
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

export default Forgotpassword;
