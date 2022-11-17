import { ChangeEvent, FormEvent, useState } from "react";
import "./Todos.scss";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAppDispatch } from "../../hooks";
import { v4 as uuidv4 } from 'uuid';
import axios from "../../axios";
import { toast, ToastContainer } from "react-toastify";

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const newTodo = {
      _id: uuidv4(),
      title,
      content,
      isCompleted: false,
    };
    if (title.trim() !== "" && content.trim() !== "") {
      await axios.post('/todos', newTodo);
      setTitle('');
      setContent('');
    } else {
      e.preventDefault();
      toast.error('Пожалуйста, заполните все поля!');
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

export default AddTodo;