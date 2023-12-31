import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn"; 
import Main from "./pages/Main";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from "./Components/Navbar";
import { useState } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [theme, setTheme] = useState(darkTheme);

  const changeTheme = () => {
    if(theme === darkTheme) {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar setTheme={changeTheme} theme={theme}/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogIn />} /> 
          <Route path="/report/:id" element={<Report />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
