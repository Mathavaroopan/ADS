
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Home from './components/Home';
import InputSec from './components/InputSec/index.js'
import { UserData } from "./data";
import Login from "./components/Login"
import Chart from 'chart.js/auto';
import SearchBar from './components/SearchBar/index.js';
import ProjectsTracking from './components/Tracking/ProjectsTracking';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Rating from "./components/SearchBar/ColorSlider.js";


const App = () => {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Projects Sanctioned",
        data: UserData.map((data) => data.projectsSanctioned),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={      <div><Home/>
      <InputSec/>
      </div>} />
        <Route path='/track-progress' element={<SearchBar/>}/>
        <Route path='/tracking' element={<div><Home/><br></br><br></br><ProjectsTracking/></div>}/>
      </Routes>
    </Router> 
    </>
  );
}


export default App;
