import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Chat from "./comonents/chat/Chat";
import Home from "./comonents/home/Home";
import { useState } from "react";
import Navbar from "./comonents/layout/Navbar";
import SignIn from "./comonents/auth/Signin";
import SignUp from "./comonents/auth/Signup";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="app" style={{ height: "100vh" }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/chat/:id/:name" Component={Chat}></Route>
            <Route exact path="/signin" Component={SignIn}></Route>
            <Route exact path="/signup" Component={SignUp}></Route>
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
