import React, { ChangeEvent, useEffect, useState } from 'react';
import "./Todos.scss";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { selectTodos } from "../../redux/todos/selectors";
import TodoItem from "./TodoItem";
import { clearAll, fetchTodos } from "../../redux/todos/slice";
import DropDown from "./DropDown";
import { StickyNote2 } from '@mui/icons-material';
import Modal from "../Modal";
import { toast } from "react-toastify";
import { selectAuth } from "../../redux/auth/selectors";
import NewsSkeleton from "../News/NewsSkeleton";
import { StatusEnum } from "../../redux/auth/types";

const TodoList = () => {
  const [all, setAll] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const { todos, status } = useSelector(selectTodos);
  const { data } = useSelector(selectAuth);
  const doneTodos = todos.filter(todo => todo.isCompleted);
  const isTodosLoading = status === StatusEnum.LOADING;
  const skeletons = [...Array(4)].map((_, index) => <NewsSkeleton key={index}/>);
  const fetchedTodos = todos.map(obj => <TodoItem key={obj._id} {...obj} isEditable={data?._id === obj.user._id}/>);
  const fetchedDoneTodos = doneTodos.map(obj => <TodoItem key={obj._id} {...obj}
                                                          isEditable={data?._id === obj.user._id}/>);

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

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="todoList">
      <div className="todoList__title">
        <StickyNote2/>
        <h2 className="todoList__title-text">Все задачи</h2>
      </div>
      {todos.length > 0 && <div className="todoList__sort">
        <DropDown changeCategory={handleChange} all={all}/>
        <button onClick={todos.length > 0 ? onModalClick : undefined} className="clear-all">Удалить все</button>
      </div>}
      <div className="todoList__container">
        {isTodosLoading ? skeletons : (all ? fetchedTodos : fetchedDoneTodos)}
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