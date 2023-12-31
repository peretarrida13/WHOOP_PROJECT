import { Typography } from "@mui/material";
import { useEffect, useState } from "react"

export default function IllnessSquare(){
    const [illness, setIllness] = useState(null);
    const [hrv, setHrv] = useState(0);
    const [Temperature, setTemperature] = useState(0);
    const [SpO2, setSpO2] = useState(0);
    const [RespirationRate, setRespirationRate] = useState(0);
    const [rhr, setRhr] = useState(0); 

    useEffect(() => {
        setIllness('COVID-19');
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
                    fontFamily={"Helvetica"}
                    paddingTop={12}
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
                        <li>HRV: {hrv}ms</li>
                        <li>Temperature: {Temperature}C</li>
                        <li>SpO2: {SpO2}%</li>
                        <li>Respiration Rate: {RespirationRate} rpm</li> 
                        <li>RHR: {rhr} bpm</li>
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