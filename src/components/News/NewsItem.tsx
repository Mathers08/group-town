import React from 'react';
import { Button, IconButton } from "@mui/material";
import './News.scss';
import { INews } from "../../redux/news/types";
import { Close, Edit } from '@mui/icons-material';
import { useAppDispatch } from "../../hooks";
import { fetchRemove } from "../../redux/news/slice";
import { Link } from "react-router-dom";
import { Modal } from "../index";

const NewsItem = ({ _id, title, content, importance, isEditable }: INews) => {
  const dispatch = useAppDispatch();
  const slicedContent = content.slice(0, 180);
  const onDeleteClick = (id: string) => {
    if (window.confirm('Вы действительно хотите удалить новость?')) {
      dispatch(fetchRemove(id));
    }
  };

  return (
    <div className="news__list-item">
      <span className="item__importance" style={{ background: `linear-gradient(${importance}, #d3d3d3)` }}/>
      <div className="item__title">
        <h2>{title}</h2>
        {isEditable && <div style={{ display: 'flex' }}>
          <IconButton onClick={() => onDeleteClick(_id)}><Edit/></IconButton>
          <IconButton onClick={() => onDeleteClick(_id)}><Close/></IconButton>
        </div>}
      </div>
      <p className="item__text">{content.length > 185 ? slicedContent + '...' : content}</p>
      {content.length > 185 &&
        <Link to={`/announcement/news/${_id}`}>
          <Button variant="contained">Читать дальше</Button>
        </Link>
      }
    </div>
  );
};

export default NewsItem;