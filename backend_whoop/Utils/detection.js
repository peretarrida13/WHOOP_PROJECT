
function detection(data){
    // Respiratory Infection
    const RI = respiratoryInfection(data.respiratoryRate, data.O2);
    if(RI.infectionDetected) return {status: 200, msg:'Possible Respiratory Infection', data: RI.data};

    // Cardiovascular Diseases
    const CD = cardiovascularDiseases(data.RestingHeartRate, data.HRV);
    if(CD.infectionDetected) return {status: 200, msg:'Possible Cardiovascular Diseases', data: CD.data};
    
    // Sleep Disorder
    const SD = sleepDisorder(data.totalSleep);
    if(SD.infectionDetected) return {status: 200, msg:'Possible Sleep Disorder', data: SD.data};

    // Febrile Illness
    const FI = febrileIllness(data.skinTemperature, data.RestingHeartRate, data.HRV);
    if(FI.infectionDetected) return {status: 200, msg:'Possible Febrile Illness', data: FI.data};
    
    // Anxiety Stress
    const AS = anxietyStress(data.totalSleep, data.HRV, data.RestingHeartRate);
    if(AS.infectionDetected) return {status: 200, msg:'Possible Anxiety Stress', data: AS.data};

    // Diabetes
    const D = diabetes(data.totalSleep, data.HRV);
    if(D.infectionDetected) return {status: 200, msg:'Possible Diabetes', data: D.data};

    // Heat Reated Illness
    const HRI = heatReatedIllness(data.skinTemperature, data.RestingHeartRate);
    if(HRI.infectionDetected) return {status: 200, msg:'Possible Heat Reated Illness', data: HRI.data};

    // Anemia
    const A = anemia(data.O2, data.RestingHeartRate);
    if(A.infectionDetected) return {status: 200, msg:'Possible Anemia', data: A.data};

    return {status: 200, status: 'ok', data: {}}
}

function respiratoryInfection(respiratoryRate, O2){
    for(let i = 0; i < 14; i++){
        if(respiratoryRate[i] > 20 && O2[i] < 95) return {infectionDetected: true, data: {respiratoryRate: respiratoryRate[i], O2: O2[i]}}
    }

    return {infectionDetected: false, data: {}}
}

function findSignificantFluctuations(arr) {
    let fluctuations = [];
    for (let i = 1; i < arr.length; i++) {
        let change = Math.abs(arr[i] - arr[i-1]);
        let percentChange = (change / arr[i-1]) * 100;

        if (percentChange > 10) {
            fluctuations.push (arr[i]);
        }
    }
    return fluctuations;
}

function calculateMean(array) {
    if (array.length === 0) return 0; // Handle empty array case

    const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / array.length;
}


function cardiovascularDiseases(RHR, HRV){
    const outliners = findSignificantFluctuations(HRV);
    const hrvMean = calculateMean(HRV);
    for(let i = 0; i < 14; i++){
        if(RHR[i] > 100 ){
            for(let j = 0; j < outliners.length; j++){
                if(HRV[i] === outliners[j]){
                    if(outliners[j] < hrvMean-20 || outliners[j] > hrvMean+20){
                        return {infectionDetected: true, data: {RHR: RHR[i], HRV: HRV[i]}}
                    }
                }
            }
        }
    }

    return {infectionDetected: false, data: {}}
}

function sleepDisorder(sleepData){
    for(let i = 0; i < 14; i++){
        const awakeTime = (sleepData[i].awake/1000)/60
        const disturbanceCount = sleepData[i].disturbance
        const sleepEfficiency = sleepData[i].efficiency
        const lightSleep = (sleepData[i].light/sleepData[i].totalSleepTime)*100

        if(awakeTime > 45 && disturbanceCount > 8 && sleepEfficiency < 75 && lightSleep > 70){
            return {infectionDetected: true, data: {awakeTime: awakeTime, disturbanceCount: disturbanceCount, sleepEfficiency: sleepEfficiency, lightSleep: lightSleep}}
        }
    }

    return {infectionDetected: false, data: {}}
}

function febrileIllness(skinTemperature, restingHeartRate, HRV){
    const outliners = findSignificantFluctuations(HRV);
    const hrvMean = calculateMean(HRV);
    for(let i = 0; i < 14; i++){
        if(restingHeartRate[i] > 100 && skinTemperature[i] > 37){
            for(let j = 0; j < outliners.length; j++){
                if(HRV[i] === outliners[j]){
                    if(outliners[j] < hrvMean-20 || outliners[j] > hrvMean+20){
                        return {infectionDetected: true, data: {RHR: restingHeartRate[i], HRV: HRV[i], skinTemperature: skinTemperature[i]}}
                    }
                }
            }
        }
    }
    return {infectionDetected: false, data: {}}
}

function anxietyStress(sleepData, HRV, restingHeartRate){
    const outliners = findSignificantFluctuations(HRV);
    const hrvMean = calculateMean(HRV);
    for(let i = 0; i < 14; i++){
        const awakeTime = (sleepData[i].awake/1000)/60 
        const disturbanceCount = sleepData[i].disturbance
        const sleepEfficiency = sleepData[i].efficiency
        const lightSleep = (sleepData[i].light/sleepData[i].totalSleepTime)*100

        if(restingHeartRate[i]>100 && awakeTime > 45 && disturbanceCount > 8 && sleepEfficiency < 75 && lightSleep > 70){
            for(let j = 0; j < outliners.length; j++){
                if(HRV[i] === outliners[j]){
                    if(outliners[j] < hrvMean-20 || outliners[j] > hrvMean+20){
                        return {infectionDetected: true, data: {RHR: restingHeartRate[i], awakeTime: awakeTime, disturbanceCount: disturbanceCount, sleepEfficiency: sleepEfficiency, lightSleep: lightSleep, HRV: HRV[i]}}
                    }
                }
            }
        }
    }

    return {infectionDetected: false, data: {}}
}

function diabetes(sleepData, HRV){
    const outliners = findSignificantFluctuations(HRV);
    const hrvMean = calculateMean(HRV);
    for(let i = 0; i < 14; i++){
        const awakeTime = (sleepData[i].awake/1000)/60
        const disturbanceCount = sleepData[i].disturbance
        const sleepEfficiency = sleepData[i].efficiency
        const lightSleep = (sleepData[i].light/sleepData[i].totalSleepTime)*100

        if(awakeTime > 45 && disturbanceCount > 8 && sleepEfficiency < 75 && lightSleep > 70){
            for(let j = 0; j < outliners.length; j++){
                if(HRV[i] === outliners[j]){
                    if(outliners[j] < hrvMean-20 || outliners[j] > hrvMean+20){
                        return {infectionDetected: true, data: {awakeTime: awakeTime, disturbanceCount: disturbanceCount, sleepEfficiency: sleepEfficiency, lightSleep: lightSleep, HRV: HRV[i]}}
                    }
                }
            }
        }
    }

    return {infectionDetected: false, data: {}}
}

function heatReatedIllness(skinTemperature, restingHeartRate){
    for(let i = 0; i < 14; i++){
        if(skinTemperature[i] > 37 && restingHeartRate[i] >= 100) return {infectionDetected: true, data: {skinTemperature: skinTemperature[i], RHR: restingHeartRate[i]}}
    }

    return {infectionDetected: false, data: {}}
}

function anemia(O2, restingHeartRate){
    for(let i = 0; i < 14; i++){
        if(O2[i] < 95 && restingHeartRate[i] >= 100) return {infectionDetected: true, data: {O2: O2[i], RHR: restingHeartRate[i]}}
    }

    return {infectionDetected: false, data: {}}
}

module.exports = {
    detection
}