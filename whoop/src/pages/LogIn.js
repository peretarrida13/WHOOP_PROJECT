import { Button, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { useState } from "react";
import '../Styles.css'

export default function LogIn() {  
    const [loading, setLoading] = useState(false);
    const login = async () => {
        setLoading(true);
        window.location.replace(`http://127.0.0.1:8081/api/auth/performance/`, "_self");
    }

    if(loading){
        return(
          <Box sx={{display:'flex', justifyContent:'center', mt:25}}>
            <CircularProgress size={75} sx={{justifyContent:'center', alignItems:'center', color:'#00F19F'}}/>
          </Box>
        )
      }

    return(
        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', color:'#00F19F'}}>
            <Card style={{ display:'flex', flexDirection:'column', height:300, width:600, alignItems:'center', justifyContent:'center',textAlign:'center', backgroundColor:'#101518'}}>
                <CardContent>
                    <Typography 
                        variant="h3"
                        fontWeight={700}
                        className="headline"
                    >
                        Sign In
                    </Typography>
                   
                </CardContent>
                <Button onClick={login} variant="contained" style={{backgroundColor:'#00F19F', marginTop:20}}>
                    <p className="headline">
                        Log In With Whoop
                    </p>
                </Button>
            </Card>
        </div>
    )
}