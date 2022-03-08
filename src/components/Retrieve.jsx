import { Link, useNavigate } from "react-router-dom";
import checkAuth from "../Auth";
import "./home.css";
import { useContext, useEffect, useState, useRef } from "react";
import { LoadingContext } from "../App";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function Retrieve(props) {
  const shortUrl = useRef();

  const { load, setLoad } = useContext(LoadingContext);
  const [retrievedUrl, setRetrievedUrl] = useState(
    "RETRIEVED FULL URL WILL BE UPDATED HERE"
  );

  async function copyToClipboard() {
    await window.navigator.clipboard.writeText(retrievedUrl);
    toast("Copied to Clipboard!");
  }

  const navigate = useNavigate();
  useEffect(async () => {
    setLoad(true);
    if (await checkAuth()) {
      navigate("/");
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
      props.setLogOutBtn(true);
    }
  }, []);
  const headers = { authorization: localStorage.getItem("authorization") };

  async function handleRetrieve(url) {
    try {
      setRetrievedUrl("RETRIEVED FULL URL WILL BE UPDATED HERE");
      if (!url) return;
      const response = await axios.get(url, {
        headers,
      });
      if (response.status === 200) {
        setRetrievedUrl(response.data.response);
        shortUrl.current.value = "";
      } else setRetrievedUrl("Invalid URL");
    } catch (err) {
      console.log(err);
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
              <h2>RETRIEVE</h2>
              <small>Please paste your short URL to proceed!</small>
            </div>
            <div className="inputbody">
              <input ref={shortUrl} type="text" placeholder="Paste short URL" />
            </div>
            <div className="foot">
              <button
                type="button"
                className="btn btn-outline-light"
                name="shorten"
                id="shorten"
                onClick={() => handleRetrieve(shortUrl.current.value)}
              >
                Retrieve
              </button>

              <div>
                <label>
                  Want to convert to short URL?
                  <Link to="/convert"> Click here</Link>
                </label>
              </div>
              <div>
                <p
                  data-for="copy"
                  data-tip
                  onClick={() => copyToClipboard()}
                  className="shorturl"
                >
                  {retrievedUrl}
                </p>{" "}
                <ReactTooltip id="copy" place="top" effect="solid">
                  Click to copy to clipboard
                </ReactTooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Retrieve;
