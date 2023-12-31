import CircularProgress  from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";

export default function RecoveryStrain(){
    const [recovery, setRecovery] = useState(100.00);   
    const [strain, setStrain] = useState(100.00);
    const [HRV, setHRV] = useState(20);
    const [calories, setCalories] = useState(1000);
    const [recoveryColor, setRecoveryColor] = useState('#00F19F');
    
    useEffect(() => {
        if(recovery <=33 ){
            setRecoveryColor('#FF0026');  
        } else if(recovery > 33 && recovery <= 66){
            setRecoveryColor('#FFDE00');  
        } else{
            setRecoveryColor('#16EC06');  
        }
    }, []);

    return(
        <div style={{display:'grid', color:'#00F19F'}}>
            <div style={{gridColumnStart:1, gridColumnEnd:2, textAlign:'center', marginTop:20, }}>
                <ul style={{listStyleType:'none', textAlign:'right', marginTop:80, position:'relative', left:10}}>
                    <li style={{fontWeight:'bold'}}>Recovery: {recovery}%</li>
                    <li style={{fontWeight:'bold'}}>Strain: {strain}</li>
                </ul>
            </div>
            <div style={{gridColumnStart:2, gridColumnEnd:3, position:'relative', top:75, left:40}}>
                <CircularProgress size={100} variant='determinate' value={strain} style={{zIndex:-1}}/>
                <CircularProgress size={75} variant='determinate' value={recovery} style={{color:recoveryColor, position:'relative', right:87.5, bottom:13}}/>
            </div>
            <div style={{gridColumnStart:3, gridColumnEnd:4}}>
                <ul style={{listStyleType:'none', textAlign:'left', top:84, position:'relative', right:50}}>
                    <li style={{fontWeight:'bold'}}>HRV: {HRV} ms</li>
                    <li style={{fontWeight:'bold'}}>Calories: {calories} kcal</li>
                </ul>
            </div>
        </div>
    )
}