import { useEffect, useState } from "react";
import { Box, CircularProgress, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import BodyPart from "../Components/BodyPart";
import IllnessSquare from "../Components/IllnessSquare";
import RecoveryStrain from "../Components/RecoveryStrain";
import ReportList from "../Components/ReportList";
import LastPerformance from "../Components/LastPerformance";
import '../Components/scroll.css'

function Main() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('pere');

  useEffect(() => {
    if(token) {
      setLoading(false);
    } else {
      window.location.href = '/login';  // redirect to login page
    }
  }, []);

  if(loading){
    return(
      <Box sx={{display:'flex', justifyContent:'center', mt:25}}>
        <CircularProgress size={75} sx={{justifyContent:'center', alignItems:'center', color:'#00F19F'}}/>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{display:'flex'}}>
        <BodyPart />
      </Box>
      <Box sx={{position:'absolute', width:'60%', ml:70, height:500, top:190, display:'grid', columnGap:1, rowGap:1}}>
        <Paper className="element" sx={{ gridColumnStart:1, gridColumnEnd:2, borderRadius:3, height:230}}>
          <ReportList />
        </Paper>
        <Paper sx={{gridColumnStart:2, borderRadius:3}}>          
          <RecoveryStrain />
        </Paper>
        <Paper className="element" sx={{gridColumnStart:1, gridColumnEnd:2, borderRadius:3, height:300}}>
          <IllnessSquare />
        </Paper>
        <Paper sx={{gridColumnStart:2, gridColumnEnd:2, borderRadius:3}}>
          <LastPerformance />
        </Paper>
      </Box>
      
    </Box>
  );
}

export default Main;