import React, { ChangeEvent, useState } from 'react';
import { Button, IconButton } from "@mui/material";
import './News.scss';
import { INews } from "../../redux/news/types";
import { Close, Edit } from '@mui/icons-material';
import { useAppDispatch } from "../../hooks";
import { fetchRemove } from "../../redux/news/slice";
import { Link } from "react-router-dom";
import { Modal } from "../index";
import axios from "../../axios";

const NewsItem = ({ _id, title, content, importance, isEditable }: INews) => {
  const dispatch = useAppDispatch();
  const [titleEdit, setTitleEdit] = useState('');
  const [contentEdit, setContentEdit] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);

  const onModalClick = () => {
    setIsModalActive(!isModalActive);
    axios.get(`/news/${_id}`)
      .then(({ data }) => {
        setTitleEdit(data.title);
        setContentEdit(data.content);
      })
      .catch(err => console.log(err));
  };
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitleEdit(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContentEdit(e.target.value);
  const handleSubmit = async () => {
    const updatedNews = {
      _id,
      title: titleEdit,
      content: contentEdit,
    };
    await axios.patch(`/news/${_id}`, updatedNews);
    setIsModalActive(false);
  };
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
          <IconButton onClick={onModalClick}><Edit/></IconButton>
          <IconButton onClick={() => onDeleteClick(_id)}><Close/></IconButton>
        </div>}
      </div>
      <p className="item__text">{content.length > 185 ? slicedContent + '...' : content}</p>
      {content.length > 185 &&
        <Link to={`/announcement/news/${_id}`}>
          <Button variant="contained">Читать дальше</Button>
        </Link>
      }
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <div className={isModalActive ? "popUp popUp__show" : "popUp"}>
          <h4 className="pop-up__title">Редактирование задачи</h4>
          <form onSubmit={handleSubmit}>
            <input value={titleEdit} onChange={onTitleChange} className="popUp__input"/>
            <textarea value={contentEdit} onChange={onContentChange} className="popUp__content"/>
            <div className="popUp__buttons">
              <button type="button" className="popUp__buttons-item no" onClick={() => setIsModalActive(false)}>
                Отменить
              </button>
              <button type="submit" className="popUp__buttons-item ok">Сохранить</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NewsItem;