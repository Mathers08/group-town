import React from 'react';
import './App.scss';
import { Header, Navbar } from "./components";
import { NavTabs } from "./pages";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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
        <NavTabs/>
      </div>
    </ThemeProvider>
  );
}

export default App;
