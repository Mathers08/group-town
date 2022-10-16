import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { ArrowBack } from '@mui/icons-material';
import { IconButton } from "@mui/material";

const FullNews = () => {
  const { id } = useParams();
  const { news } = useSelector(selectNews);
  const item = news.find(n => n.id === id);

  return (
    <div className="full">
      {item &&
        <>
          <div className="full__top">
            <Link to="/dashboard">
              <IconButton sx={{ position: 'absolute', top: 20, left: -20, width: 60, height: 60 }}>
                <ArrowBack/>
              </IconButton>
            </Link>
            <h1 className="full__top-title">{item.title}</h1>
            <div className="full__top-line" style={{ background: item.importance }}/>
          </div>
          <div className="full__main">
            <div className="full__main-info">
              <p>Автор: Black Mathers</p>
              <p>Дата создания: {item.createdAt}</p>
            </div>
            <h2 className="full__main-content">{item.content}</h2>
          </div>
        </>
      }
    </div>
  );
};

export default FullNews;