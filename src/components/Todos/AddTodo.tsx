import { ChangeEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todos.scss";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAppDispatch } from "../../hooks";
import { addTodo } from "../../redux/todos/slice";
import { ITodo } from "../../redux/todos/types";
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
    <div className="addTodo">
      <ToastContainer/>
      <div className="addTodo__title">
        <TextSnippetIcon sx={{ wight: '25px' }}/>
        <h2 className="addTodo__title-text">Создание новой задачи</h2>
      </div>
      <form onSubmit={handleSubmit} className="addTodo__inputs">
        <div>
          <p className="addTodo__inputs-count">{title.length} / 50</p>
          <input
            maxLength={50}
            value={title}
            onChange={onTitleChange}
            className="input addTodo__inputs-name"
            type="text"
            placeholder="Заголовок задачи"
          />
        </div>
        <div>
          <p className="addTodo__inputs-count">{content.length} / 100</p>
          <textarea
            maxLength={75}
            value={content}
            onChange={onContentChange}
            className="input addTodo__inputs-content"
            placeholder="Подробная информация..."
          />
        </div>

        <button type="submit" className="addTodo__inputs-submit">
          Создать новую задачу
        </button>
      </form>
    </div>
  );
};

export default AddTask;