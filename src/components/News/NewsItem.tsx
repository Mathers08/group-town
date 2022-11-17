import React, { ChangeEvent, useState } from 'react';
import { Button, IconButton } from "@mui/material";
import './News.scss';
import { allImportance, INews } from "../../redux/news/types";
import { Close, Edit } from '@mui/icons-material';
import { useAppDispatch } from "../../hooks";
import { fetchRemove } from "../../redux/news/slice";
import { Link } from "react-router-dom";
import { Modal } from "../index";
import axios from "../../axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/filter/selectors";
import { Highlighted } from "../../utils";

const NewsItem = ({ _id, title, content, importance, isEditable }: INews) => {
  const dispatch = useAppDispatch();
  const { searchValue } = useSelector(selectFilter);
  const [titleEdit, setTitleEdit] = useState('');
  const [contentEdit, setContentEdit] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const importanceIndex = allImportance.map(i => i.title).indexOf(importance);

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
      updatedTime: dayjs().format('D MMMM YYYY HH:mm')
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
      <span className="item__importance"
            style={{ background: `linear-gradient(${allImportance[importanceIndex].color}, #d3d3d3)` }}
      />
      <div className="item__title">
        <h2><Highlighted text={title} highlight={searchValue}/></h2>
        {isEditable && <div style={{ display: 'flex' }}>
          <IconButton onClick={onModalClick}><Edit/></IconButton>
          <IconButton onClick={() => onDeleteClick(_id)}><Close/></IconButton>
        </div>}
      </div>
      <p className="item__text">
        {content.length > 185
          ? slicedContent + '...'
          : <Highlighted text={content} highlight={searchValue}/>
        }
      </p>
      <Link to={`/announcement/news/${_id}`}>
        <Button variant="contained">Подробнее</Button>
      </Link>
      <Modal props={{
        active: isModalActive,
        setActive: setIsModalActive,
      }}>
        <div className={isModalActive ? "popUp popUp__show" : "popUp"}>
          <h4 className="popUp__title">Редактирование задачи</h4>
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