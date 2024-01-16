
export async function getRefreshToken(accessToken){
    try{
        const response = await fetch('http://localhost:8081/api/refresh_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            body:JSON.stringify({
                accessToken:accessToken
            })
        })
        
        const data = response.json()    

        return data.accessToken
    
    } catch(err){
        console.log(err)
        throw err
    }
}