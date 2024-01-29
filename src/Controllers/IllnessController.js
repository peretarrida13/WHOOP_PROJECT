export async function getIllnessController(token){
    const response = await fetch('https://whoop-performance-backend-e57e252e2747.herokuapp.com/api/illness/'+token, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })
    
    const data = await response.json()
    return data.data
}