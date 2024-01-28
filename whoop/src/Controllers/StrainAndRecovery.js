

export async function getStrain(accessToken) {
    const query = new URLSearchParams({
        limit: "1",
    });

    const uri = `https://api.prod.whoop.com/developer/v1/cycle?${query}`;

    const cycleResponse = await fetch(uri, {
      mode:'cors',
      method:'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Access-Control-Allow-Origin': '*'

      },
    });
  
    if (cycleResponse.status === 200) {
      return cycleResponse.json();
    } else {
      throw new Error(`Received ${cycleResponse.status} status from Whoop`);
    }
}

export async function getRecovery(token, cycle) {

    const uri = `https://api.prod.whoop.com/developer/v1/cycle/${cycle}/recovery`;
    
    const recoveryResponse = await fetch(uri, {
        mode:'cors',
        method:'GET',
        headers: {
            Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'

        },
    });

    if (recoveryResponse.status === 200) {
        return recoveryResponse.json();
    } else {
        throw new Error(`Received ${recoveryResponse.status} status from Whoop`);
    }
}