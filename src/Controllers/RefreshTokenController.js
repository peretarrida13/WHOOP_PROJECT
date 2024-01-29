
export async function getRefreshToken(accessToken){
    const response = await fetch('https://whoop-performance-backend-e57e252e2747.herokuapp.com/api/refresh_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body:JSON.stringify({
            acessToken:accessToken
        })
    })
    
    const data = await response.json()    

    return data.accessToken

}