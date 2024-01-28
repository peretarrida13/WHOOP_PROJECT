import { Box, Button } from "@mui/material";
import Cookies from "universal-cookie";
import '../Styles.css'

export default function Navbar() {
    const cookies = new Cookies();

    const handleLogout = () => {
        cookies.remove('whoopPerformance', { path: '/' })
        window.location.href = "/login";
    }


    return(
        <Box sx={{display:'flex', flexDirection:'row', backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}}>
            <a href="/">
                <img alt="navbar logo" src={require("../Images/projectLogoDark.png")} style={{justifyContent: 'flex-start', marginLeft: 15,  height:'100px'}} />
           </a>
           <Box sx={{ flexGrow: 1 }} />
           <Button variant="contained" style={{height:40, marginRight:30, backgroundColor:'#00F09F', fontWeight:700}} onClick={handleLogout}>
                <p className='headline'>Log Out</p>
           </Button>
        </Box>
    )
}