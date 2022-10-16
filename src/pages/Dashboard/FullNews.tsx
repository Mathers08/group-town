import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { ArrowBack, ChatBubbleOutlineOutlined, Person, RemoveRedEyeOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from "@mui/material";

const FullNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { news } = useSelector(selectNews);
  const item = news.find(n => n.id === id);

  const goBack = () => navigate(-1);

  return (
    <div className="full">
      {item &&
        <>
          <div className="full__top">
            <IconButton onClick={goBack} sx={{ position: 'absolute', top: 20, left: -20, width: 60, height: 60 }}>
              <ArrowBack/>
            </IconButton>
            <h1 className="full__top-title">{item.title}</h1>
            <div className="full__top-line" style={{ background: item.importance }}/>
          </div>
          <div className="full__main">
            <div className="full__main-info">
              <Avatar sx={{ width: 50, height: 50 }}>
                <Person sx={{ width: 25, height: 25 }}/>
              </Avatar>
              <div>
                <p><em>Автор:</em> Black Mathers</p>
                <p><em>Дата создания:</em> {item.createdAt}</p>
              </div>
            </div>
            <h2 className="full__main-content">{item.content}</h2>
            <ul className="full__main-details">
              <li>
                <RemoveRedEyeOutlined/>
                <span>150</span>
              </li>
              <li>
                <ChatBubbleOutlineOutlined/>
                <span>3</span>
              </li>
            </ul>
          </div>
        </>
      }
    </div>
  );
};

export default FullNews;