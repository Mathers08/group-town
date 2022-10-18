import React from 'react';
import { AddNews, NewsList } from '../../components';
import '../../components/News/News.scss';

const News = () => {
  return (
    <div className="news">
      <h1 className='page__header'>Новости</h1>
      <AddNews/>
      <h1 className="news__title">Последние новости</h1>
      <NewsList/>
    </div>
  );
};

export default News;