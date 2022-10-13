import React from 'react';
import { Button } from "@mui/material";
import './News.scss';
import { INews } from "../../../redux/news/types";

const NewsItem = ({ id, title, content }: INews) => {
  return (
    <div className="news__list-item">
      <span className="item__importance"/>
      <h2 className="item__title">{title}</h2>
      <p className="item__text">{content}</p>
      <Button variant="contained">Читать дальше</Button>
    </div>
  );
};

export default NewsItem;