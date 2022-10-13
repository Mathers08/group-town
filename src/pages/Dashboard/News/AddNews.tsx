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
import { Link } from "react-router-dom";

const AddNews = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newItem: INews = {
      id: uuidv4(),
      title,
      content,
    };
    if (title.trim() !== "" && content.trim() !== "") {
      dispatch(addNews(newItem));
      toast.success("Новость успешно добавлена!");
      setTitle('');
      setContent('');
    } else {
      toast.error("Пожалуйста, заполните все поля!");
    }
  };

  return (
    <div className="add-task">
      <ToastContainer/>
      <div className="add-task__title">
        <TextSnippetIcon sx={{ wight: '25px' }}/>
        <h2 className="add-task__title__text">Добавление новости</h2>
      </div>
      <form onSubmit={handleSubmit} className="add-task__inputs">
        <div>
          <input
            value={title}
            onChange={onTitleChange}
            className="input add-task__inputs__name"
            type="text"
            placeholder="Напишите заголовок"
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={onContentChange}
            className="input add-task__inputs__content"
            placeholder="Подробная информация..."
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          className="add-task__inputs__submit"
        >
          Добавить новость
        </motion.button>
      </form>
    </div>
  );
};

export default AddNews;