import React from 'react';
import { AddNews, NewsList } from '../../components';
import '../../components/News/News.scss';

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