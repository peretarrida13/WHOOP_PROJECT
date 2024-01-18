function formalitzar (sleepData, recoveryData){

    let RR = []
    let O2 = []
    let RHR = []
    let HRV = []
    let Awake = []
    let SEP = [] //Sleep Efficiency Percentage
    let ST = [] //Skin Temperature
    let TotalSleep = [] //Total Awake Time, Light Sleep, Disturbance Count, Sleep Efficiency

    for(let i = 0; i < sleepData.length; i++){
        RR.push(sleepData[i].score.respiratory_rate)
        Awake.push(sleepData[i].score.stage_summary.total_awake_time_milli)
        SEP.push(sleepData[i].score.sleep_efficiency_percentage)
        TotalSleep.push({
            awake: sleepData[i].score.stage_summary.total_awake_time_milli,
            light: sleepData[i].score.stage_summary.total_light_sleep_time_milli,
            disturbance: sleepData[i].score.stage_summary.disturbance_count,
            efficiency: sleepData[i].score.sleep_efficiency_percentage
        })
    }

    for(let i = 0; i < recoveryData.length; i++){
        O2.push(recoveryData[i].score.spo2_percentage)
        RHR.push(recoveryData[i].score.resting_heart_rate)
        HRV.push(recoveryData[i].score.hrv_rmssd_milli)
        ST.push(recoveryData[i].score.skin_temp_celsius)
    }

    return({
        respiraoryRate: RR,
        O2: O2,
        RestingHeartRate: RHR,
        HRV: HRV,
        awake: Awake,
        sleepEfficiencyPercentage: SEP,
        skinTemperature: ST,
        totalSleep: TotalSleep
    })
}

module.exports = { formalitzar }