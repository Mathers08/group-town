import React from 'react';
import './News.scss';
import NewsList from "./NewsList";
import AddNews from "./AddNews";

const News = () => {
  return (
    <div className="news">
      <AddNews/>
      <h1 className="news__header">Последние новости</h1>
      <NewsList/>
    </div>
  );
};

export default News;