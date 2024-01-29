

export async function getStrain(accessToken) {

  const uri = `https://whoop-performance-backend-e57e252e2747.herokuapp.com/api/strain/${accessToken}`;

  const cycleResponse = await fetch(uri, {
    method:'GET',
  });

  if (cycleResponse.status === 200) {
    return cycleResponse.json();
  } else {
    throw new Error(`Received ${cycleResponse.status} status from Whoop`);
  }
}

export async function getRecovery(token, cycle) {

  const uri = `https://whoop-performance-backend-e57e252e2747.herokuapp.com/api/recovery/${token}/${cycle}`;
  
  const recoveryResponse = await fetch(uri, {
    method:'GET',
  });

  if (recoveryResponse.status === 200) {
      return recoveryResponse.json();
  } else {
      throw new Error(`Received ${recoveryResponse.status} status from Whoop`);
  }
}