import React, { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./News.scss";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAppDispatch } from "../../hooks";
import { v4 as uuidv4 } from 'uuid';
import { INews } from "../../redux/news/types";
import { addNews } from "../../redux/news/slice";
import { formatDate } from "../../utils";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AddNews = () => {
  const dispatch = useAppDispatch();
  const importances = [
    {
      id: 0,
      color: 'green',
      title: 'Не очень важно'
    },
    {
      id: 1,
      color: 'yellow',
      title: 'Средняя важность'
    },
    {
      id: 2,
      color: 'red',
      title: 'Очень важно'
    },
  ];
  const [isFocused, setIsFocused] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [importance, setImportance] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onHeaderClick = () => setIsFocused(true);
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onImportanceClick = (id: number, color: string) => {
    setSelectedId(id);
    setImportance(color);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newItem: INews = {
      id: uuidv4(),
      title,
      content,
      importance,
      createdAt: formatDate(new Date)
    };
    if (title.trim() !== "" && content.trim() !== "" && importance !== '') {
      dispatch(addNews(newItem));
      toast.success("Новость успешно добавлена!");
      setSelectedId(-1);
      setTitle('');
      setContent('');
      setImportance('');
    } else {
      toast.error("Пожалуйста, заполните все поля!");
    }
  };

  return (
    <div className="addNews">
      <ToastContainer/>
      <div className="addNews__title">
        <TextSnippetIcon sx={{ wight: '25px' }}/>
        <h2 className="addNews__title-text">Что нового?</h2>
      </div>
      <form onSubmit={handleSubmit} className="addNews__inputs">
        {isFocused && <div className="addNews__inputs-importance">
          <div>
            <h4>Выберите важность:</h4>
            <div className="importance">
              {importances.map(importance => (
                <div key={importance.id}
                     className="importance__item"
                     onClick={() => onImportanceClick(importance.id, importance.color)}
                     style={selectedId === importance.id ? { borderBottom: '2px solid whitesmoke' } : undefined}
                >
                  <div className={`circle ${importance.color}-circle`}/>
                  <p>{importance.title}</p>
                </div>
              ))}
            </div>
          </div>

          <Link to="/editor">
            <Button variant="outlined" color='inherit' sx={{ height: 45, color: '#fff', borderColor: '#fff' }}>
              Расширенный функционал
            </Button>
          </Link>
        </div>}
        <input
          onClick={onHeaderClick}
          value={title}
          onChange={onTitleChange}
          className="news-input"
          type="text"
          placeholder="Напишите заголовок"
        />
        {isFocused && <>
          <textarea
            value={content}
            onChange={onContentChange}
            className="news-input addNews__inputs-content"
            placeholder="Подробная информация..."
          />
          <Button type="submit" color='inherit' variant="outlined" sx={{ width: 200, m: '0 auto' }}>
            Добавить новость
          </Button>
        </>
        }
      </form>
    </div>
  );
};

export default AddNews;