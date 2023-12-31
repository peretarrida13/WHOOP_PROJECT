import { Button, Card, CardContent, Typography, TextField } from "@mui/material";


export default function LogIn() {  
    return(
        <div style={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', color:'#00F19F'}}>
            <Card style={{ display:'flex', flexDirection:'column', height:300, width:600, alignItems:'center', justifyContent:'center',textAlign:'center'}}>
                <CardContent>
                    <Typography 
                        variant="h3"
                        fontWeight={700}
                    >
                        Sign In
                    </Typography>
                   
                </CardContent>
                    <div style={{marginBottom:10}}>
                        <TextField id="outlined-basic" label="Email" variant="outlined"/>
                    </div>
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                    <Button href='/' variant="contained" style={{backgroundColor:'#00F19F', marginTop:20}}>Log In</Button>
            </Card>
        </div>
    )
}