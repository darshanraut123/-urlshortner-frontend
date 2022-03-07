import checkAuth from "../Auth";
import { useEffect, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { Rings } from "react-loader-spinner";
import { LoadingContext } from "../App";
import axios from "axios";

function Convert(props) {
  const fullUrl = useRef();

  const { load, setLoad } = useContext(LoadingContext);
  const [convertedUrl, setConvertedUrl] = useState(
    "CONVERTED SHORT URL WILL BE UPDATED HERE"
  );

  const navigate = useNavigate();
  useEffect(async () => {
    setLoad(true);
    if (await checkAuth()) {
      navigate("/");
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      props.setLogOutBtn(true);
    }
  }, []);

  function handleConvert() {
    const url = fullUrl.current.value;

    if (!url) return;
    else convert(url);
  }

  async function convert(url) {
    try {
      const payload = await axios.post(
        "https://url-shortner-app-in.herokuapp.com/api/addUrl",
        {
          url,
        },
        { headers: { authorization: localStorage.getItem("authorization") } }
      );
      if (payload.status === 200) {
        setConvertedUrl(
          `https://url-shortner-app-in.herokuapp.com/api/getUrl/${payload.data.response.shortid}`
        );
        fullUrl.current.value = "";
      } else setConvertedUrl("Something is not right at the moment!");
    } catch (err) {
      console.log(err.message);
    }
  }

  return load ? (
    <div className="loadingicon">
      <Rings color="#00BFFF" height={100} width={100} />
    </div>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 box-container">
          <div className="loginbox">
            <div className="head">
              <h2>CONVERT</h2>
              <small>Please enter your full URL to proceed!</small>
            </div>
            <div className="inputbody">
              <input
                ref={fullUrl}
                type="text"
                placeholder="Full URL"
                required
              />
            </div>
            <div className="foot">
              <button
                type="button"
                className="btn btn-outline-light"
                name="shorten"
                id="shorten"
                onClick={() => {
                  handleConvert();
                }}
              >
                Convert
              </button>

              <div>
                <label>
                  Already have short URL?
                  <Link to="/retrieve"> Get full URL</Link>
                </label>
              </div>
              <div>
                <p className="shorturl">{convertedUrl}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default Convert;
