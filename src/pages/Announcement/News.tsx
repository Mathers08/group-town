import React from 'react';
import { AddNews, NewsList } from '../../components';
import '../../components/News/News.scss';

const News = () => {
  return (
    <div className="news">
      <h1 className="page__header">{"\u00a0"}Новости</h1>
      <AddNews/>
      <NewsList/>
    </div>
  );
};

export default News;