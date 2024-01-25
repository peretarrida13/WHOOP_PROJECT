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
        <div style={{
            paddingLeft:20, paddingRight:20, 
            color:'#00F19F', backgroundColor:'transparent'
        }}>
            <h1 className='headline' style={{textAlign:'center'}}>Last Performance</h1>
            <div  style={{
                width:'100%', 
                textAlign:'center',
                justifyContent:'center'}}
                className='body-text'
            >
                The last Exercise you did was a <b><u>{type}</u></b> workout.  After the review <br/> this are the numbers
            </div>
            <div>
                <ul>
                    <li className='body-text'>Max HR: <span className='numbers'>{maxHR} bpm</span></li>
                    <li className='body-text'>Avg HR: <span className='numbers'>{avgHR} bpm</span></li>
                    <li className='body-text'>Calories: <span className='numbers'>{calories} kcal</span></li>
                </ul>
            </div>
            <div style={{textAlign:'center', marginBottom:10, width:'100%'}}>
                <Typography 
                    variant="h6"
                    fontFamily={"Helvetica"}
                    align="center"
                    fontWeight={'bold'}
                    className='body-text'
                >
                    PERFORMANCE: <span className='numbers'>{performance}</span>/10
                </Typography>
            </div>
        </div>
    )
}
