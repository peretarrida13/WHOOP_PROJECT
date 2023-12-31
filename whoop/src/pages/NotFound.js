import { Button, Card, CardContent, Typography } from "@mui/material";

export default function NotFound() {
    return(
        <div style={{height:'100%', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', color:'#00F19F'}}>
            <Card style={{ display:'flex', height:250, width:600, alignItems:'center', justifyContent:'center',textAlign:'center'}}>
                <CardContent>
                    <Typography 
                        variant="h3"
                        fontWeight={700}
                    >
                        404 - Page not found
                    </Typography>
                    <Typography 
                        variant="h6"
                        fontWeight={700}
                    >
                        Sorry, the page you are looking for does not exist. &#128542;
                    </Typography>
                    <Button href='/' variant="contained" style={{backgroundColor:'#00F19F', marginTop:20}}>Return Home</Button>
                </CardContent>
            </Card>
        </div>
    )
}