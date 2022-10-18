import React, { ChangeEvent, useState } from "react";
import "./Todos.scss";
import { ITodo } from "../../redux/todos/types";
import { useAppDispatch } from "../../hooks";
import { deleteTodo, doneTodo, editTodo } from "../../redux/todos/slice";
import { toast } from "react-toastify";
import { Modal } from "../index";
import { Clear, Done, ModeEdit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const TodoItem = ({ id, title, content, isComplete }: ITodo) => {
  const dispatch = useAppDispatch();
  const [titleEdit, setTitleEdit] = useState(title);
  const [contentEdit, setContentEdit] = useState(content);
  const [isModalActive, setIsModalActive] = useState(false);

  const onModalClick = () => setIsModalActive(!isModalActive);
  const onUpdateClick = (obj: ITodo) => dispatch(editTodo(obj));
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitleEdit(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContentEdit(e.target.value);
  const handleSubmit = (e: any, isOk: boolean) => {
    e.preventDefault();
    if (isOk) {
      const updatedTodo: ITodo = {
        id,
        title: titleEdit,
        content: contentEdit,
        isComplete
      };
      onUpdateClick(updatedTodo);
      toast.success("Задача успешно отредактирована!");
    }
    setIsModalActive(false);
  };
  const onDeleteClick = (id: string) => dispatch(deleteTodo(id));
  const onDoneClick = (id: string) => dispatch(doneTodo(id));

  return (
    <>
      <div className='todoItem'>
        <span className={`line done-${isComplete}`}></span>
        <div className="todoItem__status">
          <IconButton onClick={() => onDoneClick(id)}><Done/></IconButton>
          <IconButton onClick={onModalClick}><ModeEdit/></IconButton>
          <IconButton onClick={() => onDeleteClick(id)}><Clear/></IconButton>
        </div>
        <h4 className="todoItem__title">
          {isComplete ? <del>{title}</del> : title}
        </h4>
        <p className="todoItem__content">
          {isComplete ? <del>{content}</del> : content}
        </p>

      </div>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <div className={isModalActive ? "popUp popUp__show" : "popUp"}>
          <h4 className="pop-up__title">Редактирование записи</h4>
          <form onSubmit={(e) => handleSubmit(e, true)}>
            <input
              maxLength={50}
              value={titleEdit}
              onChange={onTitleChange}
              type="text"
              className="popUp__input"
            />
            <textarea
              maxLength={75}
              value={contentEdit}
              onChange={onContentChange}
              className="popUp__content"
            />
            <div className="popUp__buttons">
              <button type="submit" className="popUp__buttons-item no" onClick={(e) => handleSubmit(e, false)}>
                Отменить
              </button>
              <button type="submit" className="popUp__buttons-item ok">Сохранить</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TodoItem;