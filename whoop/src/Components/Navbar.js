import { AppBar, Box, Container } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Height } from "@mui/icons-material";


export default function Navbar({ setTheme, theme}) {

    return(
        <Box sx={{display:'flex', flexDirection:'row', backgroundColor:'transparent'}}>
            <a href="/">
                <img src={theme.palette.mode === 'dark' ? require("../Images/projectLogoDark.png") : require("../Images/projectLogo.png")} style={{justifyContent: 'flex-start', marginLeft: 15,  height:'100px'}} />
           </a>
           <Box sx={{ flexGrow: 1 }} />
            <IconButton sx={{justifyContent:'flex-end', mr:5 }} onClick={setTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>        
        </Box>
    )
}