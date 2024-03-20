import React from 'react';
import './index.css';
import wantImage from './new.jpg';
import { useNavigate } from "react-router-dom";
 
const Home = () => {

    const navigate = useNavigate();

    return (
        <div className='home'>
            <nav className='nav-bar'>
                <h1 >Home</h1>
                <h1 onClick={()=>navigate('/home')}>Analytics</h1>
                <h1 onClick={()=>navigate('/track-progress')}>Grading</h1>
                <h1 onClick={()=>navigate('/tracking')}>View Progress</h1>
                <img className='nav-img' src={wantImage} alt="noimage"/>
            </nav>
        </div>
    )

}




export default Home;

