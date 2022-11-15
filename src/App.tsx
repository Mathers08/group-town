import React, { useEffect } from 'react';
import './App.scss';
import "react-toastify/dist/ReactToastify.css";
import { Header, Navbar } from "./components";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { FullNews, GroupList, Home, Login, News, Performance, Profile, Schedule, SignUp, Todos } from "./pages";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/auth/selectors";
import { useAppDispatch } from "./hooks";
import { fetchMe } from "./redux/auth/slice";
import dayjs from "dayjs";
import 'dayjs/locale/ru.js';

dayjs.locale('ru');

// a.split(' ').slice(0, 2).map(e => e[0]).join('');
const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: [
      'Fira Sans',
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

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data } = useSelector(selectAuth);
  const isAuth = Boolean(data);

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      {isAuth && location.pathname !== '/'
        ?
        <>
          <Header/>
          <div className="wrapper">
            <Navbar/>
            <div className="wrapper__content">
              <Routes>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/group" element={<GroupList/>}/>
                <Route path="/announcement/news" element={<News/>}/>
                <Route path="/announcement/news/:id" element={<FullNews/>}/>
                <Route path="/announcement/todos" element={<Todos/>}/>
                <Route path="/study/performance" element={<Performance/>}/>
                <Route path="/study/schedule" element={<Schedule/>}/>
              </Routes>
            </div>
          </div>
        </>
        :
        <Routes>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      }
    </ThemeProvider>
  );
};


export default App;
