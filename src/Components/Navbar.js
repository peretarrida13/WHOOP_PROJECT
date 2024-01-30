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
           { window.location.pathname === '/login' ? <Box sx={{ flexGrow: 0.7 }} /> :
            <Box sx={{ flexGrow: 0.8 }} />
           }
           <img src={require('../Images/possibleLogoTransparent.png')} alt="Whoop Logo" style={{justifyContent:'flex-end', height:'45px'}}/>
           <Box sx={{ flexGrow: 1 }} />
           { window.location.pathname === '/login' ? null :
                <Button variant="contained" style={{height:40, marginRight:30, backgroundColor:'#00F09F', fontWeight:700}} onClick={handleLogout}>
                    <p className='headline'>Log Out</p>
                </Button>
           }
        </Box>
    )
}