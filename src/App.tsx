import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Dashboard, GroupList, Home, Profile, SignIn, SignUp } from "./pages";

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
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<SignIn/>}/>
      </Routes>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {isAuth && <>
          <Header/>
          <div className="wrapper">
            <Navbar/>
            <div className="wrapper__content">
              <Routes>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/group" element={<GroupList/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
              </Routes>
            </div>
          </div>
        </>
        }
      </ThemeProvider>
    </>
  );
};


export default App;
