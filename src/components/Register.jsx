import { useState } from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import axios from "axios";
function Register({ setEmailMessage }) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      fname: "",
      lname: "",
      byear: "",
      pass: "",
      cpass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Should be an email")
        .min(5, "Min 5 chars")
        .max(40, "Max 40 chars")
        .required("required"),
      fname: Yup.string()
        .min(3, "Min 3 chars")
        .max(15, "Max 15 chars")
        .required("required"),
      lname: Yup.string()
        .min(3, "Min 3 chars")
        .max(15, "Max 15 chars")
        .required("required"),
      byear: Yup.number()
        .min(1800, "Should be more than year 1800")
        .max(2022, "Should be less than year 2022")
        .required("required"),
      pass: Yup.string().required("required"),
      cpass: Yup.string().oneOf(
        [Yup.ref("pass"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  async function handleSubmit({ email, fname, lname, byear, pass }) {
    try {
      const response = await axios.post(
        "https://url-shortner-app-in.herokuapp.com/api/signup",
        {
          email,
          password: pass,
          firstName: fname,
          lastName: lname,
          birthyear: byear,
        }
      );
      // console.log(props)

      if (response.status === 201 || response.status === 200) {
        setEmailMessage(response.data.message);
        navigate("/email");
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 box-container">
          <form className="loginbox" onSubmit={formik.handleSubmit}>
            <div className="head">
              <h2>REGISTER</h2>
              <small>Please enter your details to proceed!</small>
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
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                />
                {formik.errors.fname ? (
                  <small>{formik.errors.fname}</small>
                ) : null}
              </div>
              <div className="inputArea">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                />
                {formik.errors.lname ? (
                  <small>{formik.errors.lname}</small>
                ) : null}
              </div>
              <div className="inputArea">
                <input
                  placeholder="Enter date of birth year"
                  type="number"
                  name="byear"
                  value={formik.values.byear}
                  onChange={formik.handleChange}
                />
                {formik.errors.byear ? (
                  <small>{formik.errors.byear}</small>
                ) : null}
              </div>
              <div className="inputArea">
                <input
                  type="password"
                  placeholder="Password"
                  name="pass"
                  value={formik.values.pass}
                  onChange={formik.handleChange}
                />
                {formik.errors.pass ? (
                  <small>{formik.errors.pass}</small>
                ) : null}
              </div>
              <div className="inputArea">
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="cpass"
                  value={formik.values.cpass}
                  onChange={formik.handleChange}
                />
                {formik.errors.cpass ? (
                  <small>{formik.errors.cpass}</small>
                ) : null}
              </div>
            </div>
            <div className="foot">
              <button
                type="submit"
                className="btn btn-outline-light"
                name=""
                id=""
              >
                Sign Up
              </button>

              <div>
                <label>
                  Already have an account?
                  <Link to="/">
                    {" "}
                    <small>Login</small>
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

export default Register;
