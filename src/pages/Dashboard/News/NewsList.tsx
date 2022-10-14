import React from 'react';
import NewsItem from "./NewsItem";
import './News.scss';
import { useSelector } from "react-redux";
import { selectNews } from "../../../redux/news/selectors";

const NewsList = () => {
  const { news } = useSelector(selectNews);

  return (
    <div className="news__list">
      {news.length ? news.map(n => (
        <NewsItem key={n.id} {...n}/>
      )) : <h4 className="empty">Новостей нет!</h4>}
    </div>
  );
};

export default NewsList;