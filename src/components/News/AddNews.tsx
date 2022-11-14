import React, { ChangeEvent, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./News.scss";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAppDispatch } from "../../hooks";
import { NewsImportanceEnum } from "../../redux/news/types";
import { formatDate } from "../../utils";
import { Button } from "@mui/material";
import axios from "../../axios";

const AddNews = () => {
  const dispatch = useAppDispatch();
  const allImportance = [
    {
      id: 0,
      color: NewsImportanceEnum.EASY,
      title: 'Не очень важно'
    },
    {
      id: 1,
      color: NewsImportanceEnum.MEDIUM,
      title: 'Средняя важность'
    },
    {
      id: 2,
      color: NewsImportanceEnum.HARD,
      title: 'Очень важно'
    },
  ];
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [importance, setImportance] = useState('');

  const onHeaderClick = () => setIsFocused(true);
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const onImportanceClick = (id: number, color: string) => {
    setSelectedId(id);
    setImportance(color);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const newItem = {
      title,
      content,
      importance,
      createdAt: formatDate(new Date),
    };
    if (title.trim() !== "" && content.trim() !== "" && importance !== '') {
      await axios.post('/news', newItem);
      setSelectedId(-1);
      setTitle('');
      setContent('');
      setImportance('');
    }
  };

  return (
    <div className="addNews">
      <div className="addNews__title">
        <TextSnippetIcon sx={{ wight: '25px' }}/>
        <h2 className="addNews__title-text">Что нового?</h2>
      </div>
      <form onSubmit={handleSubmit} className="addNews__inputs">
        {isFocused && <div className="addNews__inputs-importance">
          <h4>Выберите важность:</h4>
          <div className="importance">
            {allImportance.map(importance => (
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
          <Button type="submit" color="inherit" variant="outlined" sx={{ width: 200, m: '0 auto' }}>
            Добавить новость
          </Button>
        </>
        }
      </form>
    </div>
  );
};

export default AddNews;