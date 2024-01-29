import Model from 'react-body-highlighter';
import {Box, Typography, Container} from '@mui/material';
import { getWorkoutByDates } from '../Controllers/WorkoutController';
import { useEffect, useState } from 'react';
import { getMusclesFromWorkouts } from '../Utils/bodypartParse';
import '../Styles.css'

export default function BodyPart({ token }) {
    const [sore, setSore] = useState([]);
    const [muscles, setMuscles] = useState([]);

    const getMuscles = async () => {
        const data = await getWorkoutByDates(token);
        setMuscles(data.records);
    }

    useEffect(() => {
        getMuscles()
    }, [])

    useEffect(() => {
        if(muscles.length === 0) return;
        setSore(getMusclesFromWorkouts(muscles))
    }, [muscles])

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