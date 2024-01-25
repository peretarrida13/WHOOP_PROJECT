export async function getIllnessController(token){
    const response = await fetch('http://127.0.0.1:8081/api/illness/'+token, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })
    
    const data = await response.json()
    return data.data
}