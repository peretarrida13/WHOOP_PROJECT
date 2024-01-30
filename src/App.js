import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn"; 
import Main from "./pages/Main";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "./Components/Navbar";
import Token from "./pages/Token";
import LandingPage from "./pages/LandingPage";

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body:{
          background: 'linear-gradient(#283339, #101518)',
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }
      }
    }
  },
  palette: {
    mode: 'dark',
  },
  typography:{
    color:'#00F19F'
  }
});

function App() {

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {
          window.location.pathname === '/' ? null : <Navbar/>
        }
        <Routes>
          <Route path="/dashboard" element={<Main />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogIn />} /> 
          <Route path="/report/:id" element={<Report />} />
          <Route path="/token/:token" element={<Token />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
