
export async function getRefreshToken(accessToken){
    const response = await fetch('http://127.0.0.1:8081/api/refresh_token', {
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