import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { Dashboard, GroupList, Home, Profile, SignIn, SignUp } from "./pages";
import FullNews from "./pages/Dashboard/FullNews";

// a.split(' ').slice(0, 2).map(e => e[0]).join('');
const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: [
      'Poppins',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});

const isAuth = true;

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}/>
      </Routes>
      {isAuth && location.pathname !== '/'
        ?
        <>
          <Header isAuth={isAuth}/>
          <div className="wrapper">
            <Navbar/>
            <div className="wrapper__content">
              <Routes>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/group" element={<GroupList/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/news/:id" element={<FullNews/>}/>
              </Routes>
            </div>
          </div>
        </>
        :
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<SignIn/>}/>
        </Routes>
      }
    </ThemeProvider>
  );
};


export default App;
