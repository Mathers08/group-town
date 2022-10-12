import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddTodo.scss";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAppDispatch } from "../../../../hooks";
import { addTodo } from "../../../../redux/todos/slice";
import { ITodo } from "../../../../redux/todos/types";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newTodo: ITodo = {
      id: uuidv4(),
      title,
      content,
      isComplete: false
    };
    if (title.trim() !== "" && content.trim() !== "") {
      dispatch(addTodo(newTodo));
      toast.success("Задача успешно добавлена!");
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
        <h2 className="add-task__title__text">Создание новой задачи</h2>
      </div>
      <form onSubmit={handleSubmit} className="add-task__inputs">
        <div>
          <p className="add-task__lether-count">{title.length}/50</p>
          <input
            maxLength={50}
            value={title}
            onChange={onTitleChange}
            className="input add-task__inputs__name"
            type="text"
            placeholder="Заголовок задачи"
          />
        </div>
        <div>
          <p className="add-task__lether-count">{content.length}/75</p>
          <textarea
            maxLength={75}
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
          Создать новую задачу
        </motion.button>
      </form>
    </div>
  );
};

export default AddTask;