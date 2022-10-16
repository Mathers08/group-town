import React, { ChangeEvent, useState } from "react";
import { motion } from 'framer-motion';
import "./Todos.scss";
import { ITodo } from "../../redux/todos/types";
import { useAppDispatch } from "../../hooks";
import { deleteTodo, doneTodo, editTodo } from "../../redux/todos/slice";
import { toast } from "react-toastify";
import { Modal } from "../index";

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
      <motion.div
        className="todoItem"
        initial={{ x: '-100%', margin: 0 }}
        animate={{ x: 0, marginTop: 25 }}
        exit={{
          x: '-100%',
          height: 0,
          marginTop: 0,
          padding: 0,
          opacity: 0,
          width: 0,
          transition: {
            duration: 0.3,
          },
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 10,
        }}
      >
        <span className={`line done-${isComplete}`}></span>
        <div className="todoItem__status">
          <motion.button
            whileTap={{ scale: 2 }}
            onClick={() => onDeleteClick(id)}
            className="ball todoItem__close"
          />
          <motion.button
            whileTap={{ scale: 2 }}
            onClick={onModalClick}
            className="ball todoItem__edit"
          />
          <motion.button
            whileTap={{ scale: 2 }}
            onClick={() => onDoneClick(id)}
            className="ball todoItem__done"
          />
        </div>
        <h4 className="todoItem__title">
          {isComplete ? <del>{title}</del> : title}
        </h4>
        <p className="todoItem__content">
          {isComplete ? <del>{content}</del> : content}
        </p>

      </motion.div>
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
              <button type="submit" className="popUp__buttons-item ok">Сохранить</button>
              <button type="submit" className="popUp__buttons-item no" onClick={(e) => handleSubmit(e, false)}>
                Отменить
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TodoItem;