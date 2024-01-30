import { useEffect, useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import BodyPart from "../Components/BodyPart";
import IllnessSquare from "../Components/IllnessSquare";
import RecoveryStrain from "../Components/RecoveryStrain";
import ReportList from "../Components/ReportList";
import LastPerformance from "../Components/LastPerformance";
import '../Components/scroll.css'
import Cookies from "universal-cookie";
import { getLastWorkouts } from "../Controllers/WorkoutController";
import { getRefreshToken } from "../Controllers/RefreshTokenController";

function Main() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [workouts, setWorkouts] = useState(null);
  const [lastWorkout, setLastWorkout] = useState(null);
  const cookies = new Cookies();

  const getNewToken = async (token) => {
    const newToken = await getRefreshToken(token)
    cookies.set('whoopPerformance', token, { path: '/' });
    return newToken
  }

  const saveToken = async (cookieWhoop) => {
    const newToken = await getNewToken(cookieWhoop);
    await setToken(newToken);
    
    if(newToken === undefined || newToken === null){
      window.location.href = '/login';
    } else{
      const last10Workouts = await getLastWorkouts(newToken);
      setWorkouts(last10Workouts.records);
      setLastWorkout(last10Workouts.records[0]);
    }
  }

  useEffect(() => {
    const init = async () => {
      const cookieWhoop = await cookies.get('whoopPerformance'); 
      await setToken(cookieWhoop);
      if(cookieWhoop) {
        try{
          const last10Workouts = await getLastWorkouts(cookieWhoop);
          setWorkouts(last10Workouts.records);
          setLastWorkout(last10Workouts.records[0]);
        } catch(err){
          await saveToken(cookieWhoop);
          console.log(err)
        }
      } else {
        window.location.href = '/login';  // redirect to login page
      }
    }
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      if(workouts && lastWorkout && token){
        setLoading(false);
      }
    }
    init();
  }, [workouts, lastWorkout, token]);


  if(loading){
    return(
      <Box sx={{display:'flex', justifyContent:'center', mt:25}}>
        <CircularProgress size={75} sx={{justifyContent:'center', alignItems:'center', color:'#00F19F'}}/>
      </Box>
    )
  }

  return (
    <div style={{ backgroundColor:'transparent', height:'100%'}}>
      <Box sx={{display:'flex'}}>
        <BodyPart token={token}/>
      </Box>
      <Box sx={{position:'absolute', width:'60%', ml:70, height:500, top:190, display:'grid', columnGap:1, rowGap:1}}>
        <Paper className="element" sx={{ gridColumnStart:1, gridColumnEnd:2, borderRadius:3, height:230, backgroundImage:'linear-gradient(#283339, #101518)'}}>
          <ReportList workouts={workouts ? workouts : []}/>
        </Paper>
        <Paper sx={{gridColumnStart:2, borderRadius:3, backgroundImage:'linear-gradient(#283339, #101518)'}}>          
          <RecoveryStrain token={token} />
        </Paper>
        <Paper className="element" sx={{gridColumnStart:1, gridColumnEnd:2, borderRadius:3, height:300, backgroundImage:'linear-gradient(#283339, #101518)'}}>
          <IllnessSquare token={token} />
        </Paper>
        <Paper sx={{gridColumnStart:2, gridColumnEnd:2, borderRadius:3, backgroundImage:'linear-gradient(#283339, #101518)'}}>
          <LastPerformance workout={lastWorkout ? lastWorkout : null} />
        </Paper>
      </Box>
      <div style={{height:'50px', width:'auto', position:'absolute', top:'91%', right:'1%', overflowY:'hidden'}}>
        <img style={{height:'50px', width:'auto'}} alt="powered by whoop" src={require('../Images/DatabyWhoop.png')}/>
      </div>
    </div>
  );
}

export default Main;