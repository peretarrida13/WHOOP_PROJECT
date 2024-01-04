
export async function getLastWorkout(accessToken){
    const query = new URLSearchParams({
        limit: "4",
    });

    const uri = `https://api.prod.whoop.com/developer/v1/activity/workout?${query}`

    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if(response.status === 200){
        const data = await response.json();
        return data;
    }
}