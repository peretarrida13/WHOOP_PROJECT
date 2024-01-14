import React, { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import { getWorkoutById } from '../Controllers/WorkoutController';
import { getHRZoneText } from '../Utils/reportGenerator';
import { getWorkoutType, parseIsoDateWithOffset } from '../Utils/performanceCalculator';

export default function Report() {  
    const [heartRateMaxZone, setHeartRateZones] = useState({});
    const [workout, setWorkout] = useState({});
    const [sport, setSport] = useState("Activity"); 
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
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
        }
        getWorkout();
    }, []);


    return(
        <div>
            <div>
                <h3>Summary:</h3>
                <h5>Start Date And Time: {start} </h5>
                <h5>End Date And Time: {end} </h5>
                <h5>Sport: {sport}</h5>
            </div>
            <div>
                <h3>Key Data:</h3>
                <h5>Strain: {workout.score.strain}</h5>
                <h5>Average HR</h5>
                <h5>Max HR</h5>
                <h5>Energy Expenditure</h5>
                <h5>Distance</h5>
                <h5>Altitude Gain</h5>
                <h5>Altitude Change</h5>

            </div>
            <div>
                <h3>Heart Rate Zones:</h3>
                <p>
                    Each of these heart rate zones, with their respective RPE levels, offers distinct benefits and training effects, from recovery and foundational endurance in the lower zones to peak performance and speed in the higher zones. Understanding and utilizing these zones can lead to a more effective and targeted training regimen, tailored to specific fitness goals and current levels of physical conditioning.
                </p>
                <h5>Heart Rate Zone Chart</h5>
                <h5>Heart Rate Zone Explenation</h5>
                <h6>{heartRateMaxZone.title}</h6>
                <p>{heartRateMaxZone.text}</p>
            </div>
            <div>
                <h3>Recovery Tips:</h3>
                <h5>Heart Rate Zone Chart</h5>
                <h5>Heart Rate Zone Explenation</h5>
            </div>
        </div>
    )
}