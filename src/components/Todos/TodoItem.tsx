import React, { ChangeEvent, useState } from "react";
import "./Todos.scss";
import { ITodo } from "../../redux/todos/types";
import { useAppDispatch } from "../../hooks";
import { doneTodo, editTodo, fetchRemove } from "../../redux/todos/slice";
import { toast } from "react-toastify";
import { Modal } from "../index";
import { Clear, Done, ModeEdit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const TodoItem = ({ _id, title, content, isCompleted, isEditable }: ITodo) => {
  const dispatch = useAppDispatch();
  const [titleEdit, setTitleEdit] = useState(title);
  const [contentEdit, setContentEdit] = useState(content);
  const [isModalActive, setIsModalActive] = useState(false);

  const onModalClick = () => setIsModalActive(!isModalActive);
  const onUpdateClick = (obj: any) => dispatch(editTodo(obj));
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitleEdit(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContentEdit(e.target.value);
  const handleSubmit = (isOk: boolean) => {
    if (isOk) {
      const updatedTodo = {
        _id,
        title: titleEdit,
        content: contentEdit,
        isCompleted
      };
      onUpdateClick(updatedTodo);
      toast.success("Задача успешно отредактирована!");
    }
    setIsModalActive(false);
  };
  const onDeleteClick = (id: string) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      dispatch(fetchRemove(id));
    }
  };
  const onDoneClick = (id: string) => dispatch(doneTodo(id));

  return (
    <>
      <div className="todoItem">
        <span className={`line done-${isCompleted}`}></span>
        {isEditable && <div className="todoItem__status">
          <IconButton onClick={() => onDoneClick(_id)}><Done/></IconButton>
          <IconButton onClick={onModalClick}><ModeEdit/></IconButton>
          <IconButton onClick={() => onDeleteClick(_id)}><Clear/></IconButton>
        </div>}
        <h4 className="todoItem__title">
          {isCompleted ? <del>{title}</del> : title}
        </h4>
        <p className="todoItem__content">
          {isCompleted ? <del>{content}</del> : content}
        </p>
      </div>

      <Modal active={isModalActive} setActive={setIsModalActive}>
        <div className={isModalActive ? "popUp popUp__show" : "popUp"}>
          <h4 className="pop-up__title">Редактирование записи</h4>
          <form onSubmit={() => handleSubmit(true)}>
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
              <button type="submit" className="popUp__buttons-item no" onClick={() => handleSubmit(false)}>
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