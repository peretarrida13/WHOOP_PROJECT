import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from "@mui/material";
import './Report.css'
import Cookies from "universal-cookie";
import { getWorkoutById } from '../Controllers/WorkoutController';
import { getHRZoneText, getAverageHRInformation, parseIsoDateWithOffset, getStrainInformation, getCaloriesReport, createRecoveryTips, createDataChart, msToHMS } from '../Utils/reportGenerator';
import { getWorkoutType } from '../Utils/performanceCalculator';
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend);

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
    const [recoveryReport, setRecoveryReport] = useState(null);
    const [doughnutData, setDoughnutData] = useState({})
    const [HRzones, setHRzones] = useState({})
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

            const RR = createRecoveryTips(response)
            setRecoveryReport(RR);
            
            const data = createDataChart(response.score.zone_duration)
            setDoughnutData(data)

            setHRzones(response.score.zone_duration)
        }
        getWorkout();
    }, []);

    useEffect(() => {
        if(workout && heartRateMaxZone && sport && start && end && AvgHRReport && strainReport && recoveryReport && doughnutData && HRzones){
            setLoading(false);
        }
    },[workout, heartRateMaxZone, sport, start, end, AvgHRReport, strainReport, recoveryReport, doughnutData, HRzones])


    if(loading){
        return(
          <Box sx={{display:'flex', justifyContent:'center', mt:25}}>
            <CircularProgress size={75} sx={{justifyContent:'center', alignItems:'center', color:'#00F19F'}}/>
          </Box>
        )
    }

    return(
        <div className="container">
            <div>
                <h3><u>Summary:</u></h3>
                <p><b>Start Date And Time:</b> <span className="highlight">{start}</span> </p>
                <p><b>End Date And Time:</b> <span className="highlight">{end}</span> </p>
                <p><b>Sport:</b> <span className="highlight">{sport}</span></p>
            </div>
            <div>
                <h3><u>Key Data:</u></h3>
                <p><b>Strain:</b> <span className="highlight">{Math.floor(workout.score.strain*10)/10}</span></p>
                <p className="report-title">{strainReport.title}</p>
                <p>{strainReport.text}</p>
                <p><b>Average HR:</b> <span className="highlight">{workout.score.average_heart_rate}</span> bpm, <b>Max HR:</b> <span className="highlight">{workout.score.max_heart_rate}</span> bpm</p>
                <p className="report-title">{AvgHRReport.title}</p>
                <ul>
                    <li><span className="highlight"><b>Characteristics:</b></span> {AvgHRReport.characterisitcs}</li>
                    <li><span className="highlight"><b>Physiological Effects:</b></span> {AvgHRReport.PE}</li>
                </ul>
                <p><b>Energy Expenditure:</b> <span className="highlight">{Math.floor(workout.score.kilojoule*0.239006)}</span> kcal</p>
                <ul>
                    <li><span className="highlight"><b>Indication:</b></span> {caloriesReport.indication}</li>
                    <li><span className="highlight"><b>Goal Alignment</b>:</span> {caloriesReport.goal}</li>
                </ul>
                <h4>Specific Information:</h4>
                <p><b>Distance:</b> <span className="highlight">{workout.score.distance_meter ? Math.floor(workout.score.distance_meter/10)/100 + ' km' : 'Not Recorded'}</span></p>
                <p><b>Altitude Gain:</b> <span className="highlight">{workout.score.altitude_gain_meter ? Math.floor(workout.score.altitude_gain_meter*100)/100+' meters' : 'Not Recorded'}</span></p>
                <p><b>Altitude Change:</b> <span className="highlight">{workout.score.altitude_change_meter ? Math.floor(workout.score.altitude_change_meter*100)/100+' meters' : 'Not Recorded'}</span></p>
            </div>
            <div>
                <h3><u>Heart Rate Zones:</u></h3>
                <p>
                    Each of these heart rate zones, with their respective RPE levels, offers distinct benefits and training effects, from recovery and foundational endurance in the lower zones to peak performance and speed in the higher zones. Understanding and utilizing these zones can lead to a more effective and targeted training regimen, tailored to specific fitness goals and current levels of physical conditioning.
                </p>
                <p className="zone-title"><u>Heart Rate Zone Chart</u></p>
                <div className="chart-container">
                    <div className="doughnut-chart">
                        <Doughnut style={{height:500, width:500}} data={doughnutData} />
                    </div>
                    <div className="zone-list">
                        <ul>
                            <li><span className="highlight">ZONE 0:</span> {msToHMS(HRzones.zone_zero_milli)}</li>
                            <li><span className="highlight">ZONE 1:</span> {msToHMS(HRzones.zone_one_milli)}</li>
                            <li><span className="highlight">ZONE 2:</span> {msToHMS(HRzones.zone_two_milli)}</li>
                            <li><span className="highlight">ZONE 3:</span> {msToHMS(HRzones.zone_three_milli)}</li>
                            <li><span className="highlight">ZONE 4:</span> {msToHMS(HRzones.zone_four_milli)}</li>
                            <li><span className="highlight">ZONE 5:</span> {msToHMS(HRzones.zone_five_milli)}</li>
                        </ul>
                    </div>
                </div>
                <p className="zone-title"><u>Heart Rate Zone Explanation</u></p>
                <p className="report-title">{heartRateMaxZone.title}</p>
                <p>{heartRateMaxZone.text}</p>
            </div>
            <div>
                <h3><u>Recovery Tips:</u></h3>
                <p className="report-title">{recoveryReport.title}</p>
                <ul>
                    <li>{recoveryReport.rest}</li>
                    <li>{recoveryReport.nutrition}</li>
                    <li>{recoveryReport.hydratation}</li>
                    <li>{recoveryReport.mental}</li>
                </ul>
            </div> 
            <p>All the information above is not 100% medical, for medical advice contact a doctor</p>
        </div>
    )
}