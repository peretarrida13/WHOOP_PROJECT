

export async function getStrain(accessToken) {
    const query = new URLSearchParams({
        limit: "1",
    });

    const uri = `https://api.prod.whoop.com/developer/v1/cycle?${query}`;

    const cycleResponse = await fetch(uri, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (recoveryResponse.status === 200) {
        return recoveryResponse.json();
    } else {
        throw new Error(`Received ${recoveryResponse.status} status from Whoop`);
    }
}