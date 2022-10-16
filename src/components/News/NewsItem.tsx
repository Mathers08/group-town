import React from 'react';
import { Button, IconButton } from "@mui/material";
import './News.scss';
import { INews } from "../../redux/news/types";
import { Close } from '@mui/icons-material';
import { useAppDispatch } from "../../hooks";
import { deleteNews } from "../../redux/news/slice";
import { Link } from "react-router-dom";

const NewsItem = ({ id, title, content, importance }: INews) => {
  const dispatch = useAppDispatch();
  const slicedContent = content.slice(0, 180);
  const onDeleteClick = (id: string) => dispatch(deleteNews(id));

  return (
    <div className="news__list-item">
      <span className="item__importance" style={{ background: `linear-gradient(${importance}, #d3d3d3)` }}/>
      <div className="item__title">
        <h2>{title}</h2>
        <IconButton onClick={() => onDeleteClick(id)}><Close/></IconButton>
      </div>
      <p className="item__text">{content.length > 185 ? slicedContent + '...' : content}</p>
      {content.length > 185 &&
        <Link to={`/news/${id}`}>
          <Button variant="contained">Читать дальше</Button>
        </Link>
      }
    </div>
  );
};

export default NewsItem;