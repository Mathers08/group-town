import React from 'react';
import '../TodoBlock/AddTodo/AddTodo.scss';
import { Button } from "@mui/material";
import './News.scss';

const News = () => {
  return (
    <div className="news">
      <h1 className="news__header">Последние новости</h1>
      <div className="news__list">
        <div className="news__list-item">
          <span className='item__importance'/>
          <h2 className="item__title">A World-Class Code Playground with Sandpack</h2>
          <p className="item__text">No developer blog or technical documentation site is complete without an interactive
            code playground. The
            CodeSandbox team recently released a wonderful tool called Sandpack, to help us create these live-updating
            code editors. In this tutorial, I'll show you how I use it on this blog.</p>
          <Button variant='outlined'>Читать дальше</Button>
        </div>
      </div>
    </div>
  );
};

export default News;