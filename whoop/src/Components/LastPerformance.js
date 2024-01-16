import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {calculatePerformance, getWorkoutType} from '../Utils/performanceCalculator';

export default function LastPerformance({ workout }){  
    const [performance, setPerformance] = useState(0);
    const [maxHR, setMaxHR] = useState(0);
    const [avgHR, setAvgHR] = useState(0);
    const [calories, setCalories] = useState(0);
    const [type, setType] = useState(null);

    useEffect(() => {
        if(workout){
            const perf = calculatePerformance(workout);
            setPerformance(perf);        
            setMaxHR(workout.score.max_heart_rate);
            setAvgHR(workout.score.average_heart_rate);
            setCalories(Math.floor(workout.score.kilojoule * 0.239006));
            
            const sport = getWorkoutType(workout.sport_id);
            setType(sport);
        }
    },[])

    return(
        <div style={{paddingLeft:20, paddingRight:20, color:'#00F19F'}}>
            <h1 style={{textAlign:'center'}}>Last Performance</h1>
            <div  style={{
                width:'100%', 
                textAlign:'center',
                justifyContent:'center'}}
            >
                The last Exercise you did was a <b><u>{type}</u></b> workout.  After the review <br/> this are the numbers
            </div>
            <div>
                <ul>
                    <li>Max HR: {maxHR} bpm</li>
                    <li>Avg HR: {avgHR} bpm</li>
                    <li>Calories: {calories} kcal</li>
                </ul>
            </div>
            <div style={{textAlign:'center', marginBottom:10, width:'100%'}}>
                <Typography 
                    variant="h6"
                    fontFamily={"Helvetica"}
                    align="center"
                    fontWeight={'bold'}

                >
                    PERFORMANCE: {performance}/10
                </Typography>
            </div>
        </div>
    )
}
