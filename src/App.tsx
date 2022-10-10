import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Dashboard, GroupList, Profile } from "./pages";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
        <Header/>
      <div className='wrapper'>
        <Navbar/>
        <div className='wrapper__content'>
          <Routes>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/group' element={<GroupList/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
