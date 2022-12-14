import React, { FC } from 'react';
import './Home.scss';
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/selectors";

const Home: FC = () => {
  const { data } = useSelector(selectAuth);
  const isAuth = Boolean(data);

  return (
    <div className="home">
      <div className="home__wrapper">
        <div className="home__wrapper-top">
          <h1 className="welcome">Добро пожаловать в</h1>
          <h1 className="group-town">Group Town</h1>
        </div>
        <div className="home__wrapper-bottom">
          <p>Удобный инструмент для вас и ваших друзей</p>
          <h3>Начните прямо сейчас!</h3>
          <Link to={isAuth ? '/announcement/news' : '/login'}>
            <Button variant="contained" sx={{ fontSize: '20px', borderRadius: '25px' }}>
              Начать
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;