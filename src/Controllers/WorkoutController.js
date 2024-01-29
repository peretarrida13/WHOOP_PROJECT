export async function getLastWorkouts(accessToken){
    try{
        const uri = `https://whoop-performance-backend-e57e252e2747.herokuapp.com/api/workout/getLast10Workouts/${accessToken}`
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });

        if(response.status === 200){
            const data = await response.json();
            return data;
        }
    } catch(err){
        console.log(err)
        throw err;
    }
}

export async function getWorkoutByDates(accessToken){

    const uri = `https://whoop-performance-backend-e57e252e2747.herokuapp.com/api//workout/getWorkoutByDates/${accessToken}`

    const response = await fetch(uri, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
           
    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }
}

export async function getWorkoutById(accessToken, id){
    const uri = `https://whoop-performance-backend-e57e252e2747.herokuapp.com/api/workout/getWorkoutById/${accessToken}/${id}`

    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },

    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }
}
/*

"sport_id": 1,
"score": {
    "strain":
    "average_heart_rate"
    "max_heart_rate"
    "kilojoule"
    "distance_meter"
    "altitude_gain_meter"
    "altitude_change_meter"
    "zone_duration": {
        "zone_zero_milli"
        "zone_one_milli"
        "zone_two_milli"
        "zone_three_milli"
        "zone_four_milli"
        "zone_five_milli"
    }
}
*/