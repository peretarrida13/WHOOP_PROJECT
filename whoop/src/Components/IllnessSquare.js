import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { getIllnessController } from "../Controllers/IllnessController";

export default function IllnessSquare({ token }){
    const [illness, setIllness] = useState(null);
    const [hrv, setHrv] = useState(null);
    const [Temperature, setTemperature] = useState(null);
    const [SpO2, setSpO2] = useState(null);
    const [RespirationRate, setRespirationRate] = useState(null);
    const [rhr, setRhr] = useState(null); 
    const [awakeTime, setAwakeTime] = useState(null);
    const [disturbanceCount, setDisturbanceCount] = useState(null);
    const [sleepEfficiency, setSleepEfficiency] = useState(null);
    const [lightSleep, setLightSleep] = useState(null);
    const [skinTemperature, setSkinTemperature] = useState(null);

    const getIllness = async () => {
        const data = await getIllnessController(token);
        if(data.status === "ok"){
            setIllness(null)
        } else{
            setIllness(data.msg)
            if(data.data.HRV) setHrv(Math.floor(data.data.HRV*100)/100)
            if(data.data.O2) setSpO2(Math.floor(data.data.O2))
            if(data.data.respiratoryRate) setRespirationRate(Math.floor(data.data.respiratoryRate*100)/100)
            if(data.data.RHR) setRhr(Math.floor(data.data.RHR*100)/100)
            if(data.data.awakeTime) setAwakeTime(Math.floor(data.data.awakeTime*100)/100)
            if(data.data.disturbanceCount) setDisturbanceCount(Math.floor(data.data.disturbanceCount*100)/100)
            if(data.data.sleepEfficiency) setSleepEfficiency(Math.floor(data.data.sleepEfficiency*100)/100)
            if(data.data.lightSleep) setLightSleep(Math.floor(data.data.lightSleep*100)/100)
            if(data.data.skinTemperature) setSkinTemperature(Math.floor(data.data.skinTemperature*100)/100)
        }
    }

    useEffect(() => {
        getIllness();
    }, [])
    
    if(illness === null){

        return(
            <div style={{
                position:'relative', 
                bottom:'0%', 
                width:'100%', 
                height:'100%', 
                backgroundColor: '#16EC06',
                borderRadius: 10,
                textAlign:'center',
                justifyContent:'center',
            }}>
                <Typography 
                    style={{color:'black', justifyContent:'center', fontWeight:'bold'}}
                    variant="h6"
                    paddingTop={12}
                    className="headline"
                >
                    No possible illness detected &#128512;
                </Typography>
            </div>
        )
    }
    
    return(
        <div style={{
            position:'relative', 
            bottom:'0%', 
            width:'100%', 
            height:'100%', 
            backgroundColor: '#FF0026',
            borderRadius: 10,
            textAlign:'center',
            justifyContent:'center',
        }}>
            <div style={{paddingTop:20}}>
                <Typography 
                    style={{color:'black', justifyContent:'center', fontWeight:'bold'}}
                    variant="p"
                    fontFamily={"Helvetica"}
                    paddingTop={20}
                    align="justify"
                >
                    After carefully reviewing the data it is possible that you have the following illness: {illness}
                </Typography>
                <div style={{textAlign:'left', color:'black'}}>
                    <ul style={{listStyle: 'none',}}>
                        {SpO2 && <li className="body-text">SpO2: <span className="numbers">{SpO2}%</span></li>}
                        {RespirationRate && <li className="body-text">Respiration Rate: <span className="numbers">{RespirationRate} rpm</span></li>}
                        {rhr && <li className="body-text">Resting Heart Rate: <span className="numbers">{rhr} bpm</span></li>}
                        {hrv && <li className="body-text">HRV: <span className="numbers">{hrv} ms</span></li>}
                        {awakeTime && <li className="body-text">Awake Time: <span className="numbers">{awakeTime} min</span></li>}
                        {disturbanceCount && <li className="body-text">Disturbance Count: <span className="numbers">{disturbanceCount}</span></li>}
                        {sleepEfficiency && <li className="body-text">Sleep Efficiency: <span className="numbers">{sleepEfficiency}%</span></li>}
                        {lightSleep && <li className="body-text">Light Sleep: <span className="numbers">{lightSleep}%</span></li>}
                        {skinTemperature && <li className="body-text">Skin Temperature: <span className="numbers">{skinTemperature}°C</span></li>}

                    </ul>
                </div>
                <div>
                    <Typography color={'black'}>
                        Please contact your doctor for further information.
                    </Typography>
                </div>
            </div>
        </div>
    )
}