import React, { useEffect } from 'react';
import './News.scss';
import NewsItem from "./NewsItem";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { useAppDispatch } from "../../hooks";
import { fetchNews, fetchRemove } from "../../redux/news/slice";
import { StatusEnum } from "../../redux/auth/types";
import NewsSkeleton from "./NewsSkeleton";
import { selectAuth } from "../../redux/auth/selectors";

const NewsList = () => {
  const dispatch = useAppDispatch();
  const { news, status } = useSelector(selectNews);
  const { data } = useSelector(selectAuth);
  const isNewsLoading = status === StatusEnum.LOADING;
  const skeletons = [...Array(4)].map((_, index) => <NewsSkeleton key={index}/>);
  const allNews = news.map(obj => <NewsItem key={obj._id} {...obj} isEditable={data?._id === obj.user._id}/>);

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