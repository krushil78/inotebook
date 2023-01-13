//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import ALert from "./components/ALert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <ALert alert={alert} />
          <Routes>
            <Route
              exect
              path="/"
              element={<Home showAlert={showAlert} />}
            ></Route>
            <Route exect path="/about" element={<About  showAlert={showAlert} />}></Route>
            <Route
              exect
              path="/login"
              element={<Login  showAlert={showAlert} />}
            ></Route>
            <Route
              exect
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            ></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
