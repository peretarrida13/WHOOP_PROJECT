import Model from 'react-body-highlighter';
import {Box, Typography, Container} from '@mui/material';
import { getLastWorkout } from '../Controllers/WorkoutController';
import { useEffect } from 'react';

export default function BodyPart({ token }) {
  const data = [
    { muscles: ['chest', 'triceps'], frequency: 3 },
    { name: 'Push Ups', muscles: ['chest'] },
    { name: 'Push Ups', muscles: ['triceps'] },
  ];

    const getMuscles = async () => {
        const data = await getLastWorkout(token);
        console.log(data)
    }

    useEffect(() => {
        getMuscles()
    }, [])

  return (
    <Box>
        <Typography
            variant='h4'
            sx={{
                ml:19, 
                mb:5, 
            }}
        >
            Muscle Recovery
        </Typography>
        <Box sx={{display:'flex', ml:5}}>
            <Model
                bodyColor=' #16EC06'
                data={data}
                style={{ width: '15rem', paddingRight: '10px'}}
                highlightedColors={['#FFDE00', 'red']}
            />
            <Model
                bodyColor='#16EC06'
                type="posterior"
                data={data}
                style={{ width: '15rem', paddingLeft: '10px' }}
                highlightedColors={['#FFDE00', '#FF0026']}
            />

        </Box>
    </Box>
    
  );
}