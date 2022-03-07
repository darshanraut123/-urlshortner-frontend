import axios from "axios";

async function checkAuth() {
  try {
    const token = localStorage.getItem("authorization");
    if (!token) return true;
    else {
      const res = await axios.get(
        "https://url-shortner-app-in.herokuapp.com/api/auth",
        { headers: { authorization: token } }
      );
      if (res.status === 200) return false;
      else return true;
    }
  } catch (err) {
    console.log(err.message);
  }
}

export default checkAuth;
