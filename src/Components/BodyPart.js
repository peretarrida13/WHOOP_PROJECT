import Model from 'react-body-highlighter';
import {Box, Typography, CircularProgress} from '@mui/material';
import { getWorkoutByDates } from '../Controllers/WorkoutController';
import { useEffect, useState } from 'react';
import { getMusclesFromWorkouts } from '../Utils/bodypartParse';
import '../Styles.css'

export default function BodyPart({ token }) {
    const [sore, setSore] = useState([]);
    const [muscles, setMuscles] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMuscles = async () => {
        if(token === null) window.location.href = '/login';
        const data = await getWorkoutByDates(token);
        setMuscles(data.records);
    }

    useEffect(() => {
        getMuscles()
    }, [])

    useEffect(() => {
        setSore(getMusclesFromWorkouts(muscles))
        setLoading(false);
    }, [muscles])

    if(loading){
        return(
          <Box sx={{display:'flex', justifyContent:'center', mt:25}}>
          </Box>
        )
    }

    if(muscles.length === 0 || sore.length  === 0){
        return (
            <Box>
                <Typography
                    variant='h4'
                    sx={{
                        ml:15, 
                        mb:5, 
                    }}
                    className='headline'
                >
                    Muscle Recovery
                </Typography>
                <Box sx={{display:'flex', ml:5}}>
                    <Model
                        bodyColor='#16EC06'
                        style={{ width: '15rem', paddingRight: '10px'}}
                    />
                    <Model
                        bodyColor='#16EC06'
                        type="posterior"
                        style={{ width: '15rem', paddingLeft: '10px' }}
                    />

                </Box>
            </Box>
        )
    }

    
    return (
        <Box>
            <Typography
                variant='h4'
                sx={{
                    ml:15, 
                    mb:5, 
                }}
                className='headline'
            >
                Muscle Recovery
            </Typography>
            <Box sx={{display:'flex', ml:5}}>
                <Model
                    bodyColor='#16EC06'
                    data={sore}
                    style={{ width: '15rem', paddingRight: '10px'}}
                    highlightedColors={['#d2d94c', '#FFDE00', '#FF0026']}
                />
                <Model
                    bodyColor='#16EC06'
                    type="posterior"
                    data={sore}
                    style={{ width: '15rem', paddingLeft: '10px' }}
                    highlightedColors={['#d2d94c', '#FFDE00', '#FF0026']}
                />

            </Box>
        </Box>
        
    );
}