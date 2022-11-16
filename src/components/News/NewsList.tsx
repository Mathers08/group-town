import React, { useEffect, useState } from 'react';
import './News.scss';
import NewsItem from "./NewsItem";
import { useSelector } from "react-redux";
import { selectNews } from "../../redux/news/selectors";
import { useAppDispatch } from "../../hooks";
import { fetchNews } from "../../redux/news/slice";
import { StatusEnum } from "../../redux/auth/types";
import NewsSkeleton from "./NewsSkeleton";
import { selectAuth } from "../../redux/auth/selectors";
import DropDown from "../DropDown";
import { useParams } from "react-router-dom";

const NewsList = () => {
  const dispatch = useAppDispatch();
  const [condition, setCondition] = useState(false);
  const filterItems = ['все', 'не очень важно', 'средняя важность', 'очень важно'];
  const { news, status } = useSelector(selectNews);
  const { data } = useSelector(selectAuth);
  const isNewsLoading = status === StatusEnum.LOADING;
  const skeletons = [...Array(4)].map((_, index) => <NewsSkeleton key={index}/>);
  const [filteredNews, setFilteredNews] = useState(news);

  const filteredResult = (categoryItem: string) => {
    if (categoryItem === 'все') {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter(item => item.importance === categoryItem));
    }
    setCondition(true);
  };

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <>
      {news.length > 0 &&
        <div className="news__title">
          <h1>Последние новости</h1>
          <DropDown filterItems={filterItems} filteredResult={filteredResult}/>
        </div>
      }
      <div className="news__list">
        {isNewsLoading ? skeletons : (condition ? filteredNews : news).map(obj => (
          <NewsItem key={obj._id} {...obj} isEditable={data?._id === obj.user._id}/>)).reverse()
        }
      </div>
    </>
  );
};

export default NewsList;