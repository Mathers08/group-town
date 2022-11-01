import React, { useEffect } from 'react';
import './News.scss';
import NewsItem from "./NewsItem";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { useAppDispatch } from "../../hooks";
import { fetchNews } from "../../redux/news/slice";
import { NewsStatusEnum } from "../../redux/news/types";
import NewsSkeleton from "./NewsSkeleton";

const NewsList = () => {
  const dispatch = useAppDispatch();
  const { news, status } = useSelector(selectNews);
  const isNewsLoading = status === NewsStatusEnum.LOADING;
  const skeletons = [...Array(4)].map((_, index) => <NewsSkeleton key={index}/>);
  const allNews = news.map(obj => <NewsItem key={obj._id} {...obj}/>);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <div className="news__list">
      {isNewsLoading ? skeletons : allNews}
    </div>
  );
};

export default NewsList;