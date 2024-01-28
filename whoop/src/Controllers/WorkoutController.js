export async function getLastWorkouts(accessToken){
    try{
        const query = new URLSearchParams({
            limit: "10",
        });

        const uri = `https://api.prod.whoop.com/developer/v1/activity/workout?${query}`

        const response = await fetch(uri, {
            mode:'no-cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Access-Control-Allow-Origin': '*'

            }
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

// Function to format date and time as a string
function formatDateToISO(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export async function getWorkoutByDates(accessToken){
    // Current date and time
    let currentDate = new Date();
    // Calculating the date and time for two days ago
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(currentDate.getDate() - 3);


    const query = new URLSearchParams({
        start: formatDateToISO(twoDaysAgo),
        end: formatDateToISO(currentDate),
    });

    const uri = `https://api.prod.whoop.com/developer/v1/activity/workout?${query}`

    const response = await fetch(uri, {
        mode:'no-cors',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*'
        }
    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }
}

export async function getWorkoutById(accessToken, id){
    const uri = `https://api.prod.whoop.com/developer/v1/activity/workout/${id}`

    const response = await fetch(uri, {
        mode:'no-cors',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Access-Control-Allow-Origin': '*',
        }
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