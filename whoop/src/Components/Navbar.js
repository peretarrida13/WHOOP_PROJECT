import { Box, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Cookies from "universal-cookie";

export default function Navbar({ setTheme, theme}) {
    const cookies = new Cookies();

    const handleLogout = () => {
        cookies.remove('whoopPerformance', { path: '/' })
        window.location.href = "/login";
    }


    return(
        <Box sx={{display:'flex', flexDirection:'row', backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}}>
            <a href="/">
                <img alt="navbar logo" src={theme.palette.mode === 'dark' ? require("../Images/projectLogoDark.png") : require("../Images/projectLogo.png")} style={{justifyContent: 'flex-start', marginLeft: 15,  height:'100px'}} />
           </a>
           <Box sx={{ flexGrow: 1 }} />
           <Button variant="contained" style={{height:40, marginRight:30, backgroundColor:'#00F09F', fontWeight:700}} onClick={handleLogout}>
                Log Out
           </Button>
            <IconButton sx={{justifyContent:'flex-end', mr:5, color:'#00F09F'}} onClick={setTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon color="#00F09F"/> : <Brightness4Icon color="#00F09F"/>}
            </IconButton>        
        </Box>
    )
}