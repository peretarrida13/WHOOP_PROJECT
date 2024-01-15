import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from "@mui/material";
import Cookies from "universal-cookie";
import { getWorkoutById } from '../Controllers/WorkoutController';
import { getHRZoneText, getAverageHRInformation, parseIsoDateWithOffset, getStrainInformation, getCaloriesReport } from '../Utils/reportGenerator';
import { getWorkoutType } from '../Utils/performanceCalculator';

export default function Report() {  
    const [loading, setLoading] = useState(true);
    const [heartRateMaxZone, setHeartRateZones] = useState({});
    const [workout, setWorkout] = useState({});
    const [sport, setSport] = useState("Activity"); 
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [AvgHRReport, setAvgHRReport] = useState({title: "", characterisitcs:"", PE:""});
    const [strainReport, setStrainReport] = useState({title: "", text:""});
    const [caloriesReport, setCaloriesReport] = useState({indication: "", goal:""});
    const cookies = new Cookies();


    useEffect(() => {
        const id = window.location.pathname.split('/')[2]

        const getWorkout = async () => {
            const cookieWhoop = await cookies.get('whoopPerformance'); 
            const response = await getWorkoutById(cookieWhoop, id);
            setWorkout(response);
            
            const HRzone = getHRZoneText(response);
            setHeartRateZones(HRzone);

            const sportName = getWorkoutType(response.sport_id);
            setSport(sportName)

            const startDate = parseIsoDateWithOffset(response.start, response.timezone_offset);
            setStart(startDate);

            const endDate = parseIsoDateWithOffset(response.end, response.timezone_offset);
            setEnd(endDate);

            const AHRReport = getAverageHRInformation(response.score.average_heart_rate);
            setAvgHRReport(AHRReport);

            const SR = getStrainInformation(Math.floor(response.score.strain*100)/100);
            setStrainReport(SR)
            
            const CR = getCaloriesReport(Math.floor(response.score.kilojoule*0.239006));
            setCaloriesReport(CR);
        }
        getWorkout();
    }, []);

    useEffect(() => {
        if(workout && heartRateMaxZone && sport && start && end && AvgHRReport && strainReport){
            setLoading(false);
        }
    },[workout, heartRateMaxZone, sport, start, end, AvgHRReport, strainReport])


    if(loading){
        return(
          <Box sx={{display:'flex', justifyContent:'center', mt:25}}>
            <CircularProgress size={75} sx={{justifyContent:'center', alignItems:'center', color:'#00F19F'}}/>
          </Box>
        )
    }

    return(
        <div>
            <div>
                <h3><u>Summary:</u></h3>
                <h5>Start Date And Time: {start} </h5>
                <h5>End Date And Time: {end} </h5>
                <h5>Sport: {sport}</h5>
            </div>
            <div>
                <h3><u>Key Data:</u></h3>
                <h5>Strain: {Math.floor(workout.score.strain*10)/10}</h5>
                <p><b>{strainReport.title}</b></p>
                <p>{strainReport.text}</p>
                <h5>Average HR: {workout.score.average_heart_rate} bpm And Max HR: {workout.score.max_heart_rate} bpm</h5>
                <p>{AvgHRReport.title}</p>
                <ul>
                    <li><b>Characteristics: {AvgHRReport.characterisitcs}</b></li>
                    <li><b>Physiological Effects: {AvgHRReport.PE}</b></li>
                </ul>
                <h5>Energy Expenditure: {Math.floor(workout.score.kilojoule*0.239006)} kcal</h5>
                <ul>
                    <li><b>Indication:</b> {caloriesReport.indication}</li>
                    <li><b>Goal Alignment:</b> {caloriesReport.goal}</li>
                </ul>
                <h4>Specific Information:</h4>
                <h5>Distance: {workout.score.distance_meter ? Math.floor(workout.score.distance_meter/10)/100 + ' km' : 'Not Recorded'}</h5>
                <h5>Altitude Gain: {workout.score.altitude_gain_meter ? Math.floor(workout.score.altitude_gain_meter*100)/100+' meters' : 'Not Recorded'}</h5>
                <h5>Altitude Change: {workout.score.altitude_change_meter ? Math.floor(workout.score.altitude_change_meter*100)/100+' meters' : 'Not Recorded'}</h5>
            </div>
            <div>
                <h3><u>Heart Rate Zones:</u></h3>
                <p>
                    Each of these heart rate zones, with their respective RPE levels, offers distinct benefits and training effects, from recovery and foundational endurance in the lower zones to peak performance and speed in the higher zones. Understanding and utilizing these zones can lead to a more effective and targeted training regimen, tailored to specific fitness goals and current levels of physical conditioning.
                </p>
                <h5><u>Heart Rate Zone Chart</u></h5>
                <h5><u>Heart Rate Zone Explenation</u></h5>
                <h6>{heartRateMaxZone.title}</h6>
                <p>{heartRateMaxZone.text}</p>
            </div>
            <div>
                <h3><u>Recovery Tips:</u></h3>
            </div>
        </div>
    )
}