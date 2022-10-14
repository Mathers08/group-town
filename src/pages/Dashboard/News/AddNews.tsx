import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./News.scss";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAppDispatch } from "../../../hooks";
import { v4 as uuidv4 } from 'uuid';
import { INews } from "../../../redux/news/types";
import { addNews } from "../../../redux/news/slice";

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
  const [selectedId, setSelectedId] = useState(-1);
  const [importance, setImportance] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
      importance
    };
    if (title.trim() !== "" && content.trim() !== "" && importance !== '') {
      dispatch(addNews(newItem));
      toast.success("Новость успешно добавлена!");
      setSelectedId(-1);
      setTitle('');
      setContent('');
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
        <div className="addNews__inputs-importance">
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
        <input
          value={title}
          onChange={onTitleChange}
          className="news-input addNews__inputs-title"
          type="text"
          placeholder="Напишите заголовок"
        />
        <textarea
          value={content}
          onChange={onContentChange}
          className="news-input addNews__inputs-content"
          placeholder="Подробная информация..."
        />

        <motion.button type="submit" whileTap={{ scale: 0.9 }} className="addNews__inputs-submit">
          Добавить новость
        </motion.button>
      </form>
    </div>
  );
};

export default AddNews;