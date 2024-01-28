import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from "@mui/material";
import '../Styles.css'
import Cookies from "universal-cookie";
import { getWorkoutById } from '../Controllers/WorkoutController';
import { getHRZoneText, getAverageHRInformation, parseIsoDateWithOffset, getStrainInformation, getCaloriesReport, createRecoveryTips, createDataChart, msToHMS } from '../Utils/reportGenerator';
import { calculatePerformance, getWorkoutType } from '../Utils/performanceCalculator';
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
    const [performance, setPerformance] = useState(0);
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

            const perf = calculatePerformance(response); 
            setPerformance(perf);

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
                <h3 className='headline'><u>Summary:</u></h3>
                <p className='body-text'><b>Start Date And Time:</b> <span className="highlight numbers">{start}</span> </p>
                <p className='body-text'><b>End Date And Time:</b> <span className="highlight numbers">{end}</span> </p>
                <p className='body-text'><b>Sport:</b> <span className="highlight">{sport}</span></p>
            </div>
            <div>
                <h3 className='headline'><u>Key Data:</u></h3>
                <p className='body-text'><b>Performance Score:</b> <span className="numbers">{performance}</span></p>
                <p className='body-text'><b>Strain:</b> <span className="numbers">{Math.floor(workout.score.strain*10)/10}</span></p>
                <p className="report-title headline">{strainReport.title}</p>
                <p className='body-text'>{strainReport.text}</p>
                <p className='body-text'><b>Average HR:</b> <span className="numbers">{workout.score.average_heart_rate}</span> bpm, <b>Max HR:</b> <span className="numbers">{workout.score.max_heart_rate}</span> bpm</p>
                <p className="report-title headline">{AvgHRReport.title}</p>
                <ul>
                    <li className='body-text'><span className="highlight"><b>Characteristics:</b></span> <span>{AvgHRReport.characterisitcs}</span></li>
                    <li className='body-text'><span className="highlight"><b>Physiological Effects:</b></span> {AvgHRReport.PE}</li>
                </ul>
                <p className='body-text'><b>Energy Expenditure:</b> <span className="highlight numbers">{Math.floor(workout.score.kilojoule*0.239006)}</span> kcal</p>
                <ul>
                    <li className='body-text'><span className="highlight"><b>Indication:</b></span> {caloriesReport.indication}</li>
                    <li className='body-text'><span className="highlight"><b>Goal Alignment</b>:</span> {caloriesReport.goal}</li>
                </ul>
                <h4 className='headline'>Specific Information:</h4>
                <p className='body-text'><b>Distance:</b> <span className="highligh numbers">{workout.score.distance_meter ? Math.floor(workout.score.distance_meter/10)/100 + ' km' : 'Not Recorded'}</span></p>
                <p className='body-text'><b>Altitude Gain:</b> <span className="highlight numbers">{workout.score.altitude_gain_meter ? Math.floor(workout.score.altitude_gain_meter*100)/100+' meters' : 'Not Recorded'}</span></p>
                <p className='body-text'><b>Altitude Change:</b> <span className="highlight numbers">{workout.score.altitude_change_meter ? Math.floor(workout.score.altitude_change_meter*100)/100+' meters' : 'Not Recorded'}</span></p>
            </div>
            <div>
                <h3 className='headline'><u>Heart Rate Zones:</u></h3>
                <p className='body-text'> 
                    Each of these heart rate zones, with their respective RPE levels, offers distinct benefits and training effects, from recovery and foundational endurance in the lower zones to peak performance and speed in the higher zones. Understanding and utilizing these zones can lead to a more effective and targeted training regimen, tailored to specific fitness goals and current levels of physical conditioning.
                </p>
                <p className="zone-title headline"><u>Heart Rate Zone Chart</u></p>
                <div className="chart-container">
                    <div className="doughnut-chart">
                        <Doughnut style={{height:500, width:500}} data={doughnutData} />
                    </div>
                    <div className="zone-list">
                        <ul>
                            <li className='body-text'><span className="highlight">ZONE 0:</span> <span className='numbers'>{msToHMS(HRzones.zone_zero_milli)}</span></li>
                            <li className='body-text'><span className="highlight">ZONE 1:</span> <span className='numbers'>{msToHMS(HRzones.zone_one_milli)}</span></li>
                            <li className='body-text'><span className="highlight">ZONE 2:</span> <span className='numbers'>{msToHMS(HRzones.zone_two_milli)}</span></li>
                            <li className='body-text'><span className="highlight">ZONE 3:</span> <span className='numbers'>{msToHMS(HRzones.zone_three_milli)}</span></li>
                            <li className='body-text'><span className="highlight">ZONE 4:</span> <span className='numbers'>{msToHMS(HRzones.zone_four_milli)}</span></li>
                            <li className='body-text'><span className="highlight">ZONE 5:</span> <span className='numbers'>{msToHMS(HRzones.zone_five_milli)}</span></li>
                        </ul>
                    </div>
                </div>
                <p className="zone-title headline"><u>Heart Rate Zone Explanation</u></p>
                <p className="report-title body-text">{heartRateMaxZone.title}</p>
                <p className='body-text'>{heartRateMaxZone.text}</p>
            </div>
            <div>
                <h3 className='headline'><u>Recovery Tips:</u></h3>
                <p className="report-title">{recoveryReport.title}</p>
                <ul>
                    <li className='body-text'>{recoveryReport.rest}</li>
                    <li className='body-text'>{recoveryReport.nutrition}</li>
                    <li className='body-text'>{recoveryReport.hydratation}</li>
                    <li className='body-text'>{recoveryReport.mental}</li>
                </ul>
            </div> 
            <div style={{height:'50px', width:'auto', position:'fixed', top:'91%', right:'1%', overflowY:'hidden'}}>
                <img style={{height:'50px', width:'auto'}} alt="powered by whoop" src={require('../Images/DatabyWhoop.png')}/>
            </div>
            <p className='headline' style={{textAlign:'center', marginTop:50}}><u>All the information above is not 100% medical, for medical advice contact a doctor</u></p>
        </div>
    )
}