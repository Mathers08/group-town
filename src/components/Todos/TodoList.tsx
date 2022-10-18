import React, { ChangeEvent, useState } from 'react';
import "./Todos.scss";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { selectTodos } from "../../redux/todos/selectors";
import TodoItem from "./TodoItem";
import { clearAll } from "../../redux/todos/slice";
import DropDown from "./DropDown";
import { StickyNote2 } from '@mui/icons-material';
import Modal from "../Modal";
import { toast } from "react-toastify";

const TodoList = () => {
  const [all, setAll] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const { todos } = useSelector(selectTodos);
  const doneTodos = todos.filter(todo => todo.isComplete);

  const onModalClick = () => setIsModalActive(!isModalActive);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.dataset.catagory === 'all') {
      setAll(true);
    } else if (e.target.dataset.catagory === 'done') {
      setAll(false);
    }
  };
  const onClearClick = () => {
    dispatch(clearAll());
    onModalClick();
    toast.success("Задачи успешно удалены!");
  };

  return (
    <div className="todoList">
      <div className="todoList__title">
        <StickyNote2/>
        <h2 className="todoList__title-text">Все задачи</h2>
      </div>
      <div className="todoList__sort">
        <DropDown changeCategory={handleChange} all={all}/>
        <button onClick={todos.length > 0 ? onModalClick : undefined} className="clear-all">Удалить все</button>
      </div>
      <div className="todoList__container">
        {todos.length ? (
          all
            ? todos.map(todo => <TodoItem key={todo.id} {...todo}/>)
            : doneTodos.map(todo => <TodoItem key={todo.id} {...todo}/>)
        ) : <h4 className="nothing">На данный момент у вас нет задач!</h4>}
      </div>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <div className={isModalActive ? "popUp popUp__show" : "popUp"}>
          <h3>Вы уверены, что хотите удалить все?</h3>
          <div className="popUp__buttons">
            <button style={{ color: '#000' }} type="submit" className="popUp__buttons-item" onClick={onModalClick}>
              Отменить
            </button>
            <button type="submit" className="popUp__buttons-item no" onClick={onClearClick}>
              Удалить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;