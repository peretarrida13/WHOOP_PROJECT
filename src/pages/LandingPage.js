import { Button } from "@mui/material";
import React from "react";
import  Typewriter  from 'typewriter-effect'

export default function LandingPage() {
    return (
        <div>
            <div id="topBarLogo" style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:-1, marginTop:'2%'}}>
                <img src={require('../Images/possibleLogoTransparent.png')} alt="Whoop Logo" style={{height:'100px', width:'auto'}}/>
            </div>
            <div id="title" style={{fontStyle:"oblique 1deg", fontSize:'32px', WebkitTextStrokeWidth:"2px", WebkitTextStrokeColor:"white", color:'transparent', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <h1>
                    <Typewriter
                        options={{
                            cursor: "",
                        }}
                            onInit={(typewriter) => {
                            typewriter.changeDelay(50).typeString("WINNER PERFORMANCE").start();
                        }}
                    />
                </h1>
            </div>
            <div id="text" style={{fontSize:'14px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div style={{width:'60%', textAlign:'justify'}}>
                    <p>
                        Embark on a journey of understanding your body like never before with our integration of WHOOP data. Our platform offers a dynamic visualization of your muscle recovery, 
                        highlighting potential areas of soreness after your workouts, empowering you to train smarter.
                    </p>
                    <span>Features: </span>
                    <ul>
                        <li><b>Muscle Recovery Map:</b> A color-coded representation of your body indicates areas that may need attention or rest.</li>
                        <li><b>Health Insights</b>: With our intuitive detection system, we constantly monitor for signs of overtraining or illness – keeping your well-being at the forefront.</li>
                        <li><b>Performance Metrics:</b> Dive into the specifics of your last workout with heart rate data, calories burned, and a performance score, helping you track progress and set goals.</li>
                        <li><b>Workout Reports</b>: Access a detailed breakdown of your last 10 workouts, providing insights into your training patterns and recovery needs.</li>
                    </ul>
                    <h2>
                        Important Note:
                    </h2>
                    <p>
                        While our platform provides detailed fitness and wellness analytics, it is crucial to understand that this is not a substitute for professional medical advice, 
                        diagnosis, or treatment. Always seek the guidance of your physician or other qualified health providers with any questions you may have regarding a medical condition or 
                        health objectives. 
                    </p>
                </div>
            </div>
            <div style={{fontSize:'24px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', marginTop:'2%'}}>
                <Button variant="contained" color="primary" href="/login" style={{marginRight:'15px', fontWeight:'bold'}}>
                    Login
                </Button>
                <Button variant="contained" color="primary" href="/privacy-policy" style={{ marginLeft:'15px', fontWeight:'bold'}}>
                    Privacy Policy
                </Button>
            </div>
        </div>
    );
}