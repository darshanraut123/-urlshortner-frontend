import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Convert from "./components/Convert";
import Register from "./components/Register";
import Retrieve from "./components/Retrieve";
import Forgotpassword from './components/Forgotpassword';
import { createContext, useState } from "react";
import Email from "./components/Email";
import EmailVerify from "./components/EmailVerify";

export const LoadingContext = createContext();

function App() {
  const [emailMessage,setEmailMessage]=useState("");
  const [logoutBtn, setLogOutBtn] =  useState(false);
  const [load, setLoad] =  useState(false);

  //https://url-shortner-app-frontend.herokuapp.com/
  return (
    <div className="App">
      <Routers>
        <Navbar logoutBtn={logoutBtn} setLogOutBtn={setLogOutBtn}/>
        <LoadingContext.Provider value={{load, setLoad}}>
        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/email"  element={<Email emailMessage={emailMessage}/>}></Route>
          <Route path="/convert" element={<Convert setLogOutBtn={setLogOutBtn} />}></Route>
          <Route path="/register"  element={<Register setEmailMessage={setEmailMessage}/>}></Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
          <Route path="/retrieve" element={<Retrieve setLogOutBtn={setLogOutBtn}/>}></Route>
          <Route path="/emailverify/:token" element={<EmailVerify/>}></Route>
        </Routes>
        </LoadingContext.Provider>
      </Routers>
    </div>
  );


}

export default App;
