import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Dashboard, GroupList, Profile, SignIn, SignUp } from "./pages";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const isAuth = true;

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Header/>
      {isAuth ? <div className="wrapper">
          <Navbar/>
          <div className="wrapper__content">
            <Routes>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/group" element={<GroupList/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
          </div>
        </div> :
        <Routes>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      }
    </ThemeProvider>
  );
};

export default App;
