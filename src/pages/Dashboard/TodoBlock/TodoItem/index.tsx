import React, { useState } from "react";
import { motion } from 'framer-motion';
import './TodoItem.scss';
import { ITodo } from "../../../../redux/todos/types";
import { useAppDispatch } from "../../../../hooks";
import { deleteTodo, doneTodo } from "../../../../redux/todos/slice";
import Popup from "../Popup";

const TodoItem = ({ id, title, content, isComplete }: ITodo) => {
  const dispatch = useAppDispatch();
  const [isEditModalActive, setIsEditModalActive] = useState(false);

  const onModalClick = () => setIsEditModalActive(!isEditModalActive);
  const onDeleteClick = (id: string) => dispatch(deleteTodo(id));
  const onDoneClick = (id: string) => dispatch(doneTodo(id));

  return (
    <>
      <motion.div
        className="task"
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
        <span className={`task-line done-${isComplete}`}></span>
        <div className="task__status">
          <motion.button
            whileTap={{ scale: 2 }}
            onClick={() => onDeleteClick(id)}
            className="ball task__close"
          />
          <motion.button
            whileTap={{ scale: 2 }}
            onClick={onModalClick}
            className="ball task__edit"
          />
          <motion.button
            whileTap={{ scale: 2 }}
            onClick={() => onDoneClick(id)}
            className="ball task__done"
          />
        </div>
        <h4 className="task__title">
          {isComplete ? <del>{title}</del> : title}
        </h4>
        <p className="task__content">
          {isComplete ? <del>{content}</del> : content}
        </p>

      </motion.div>
      <Popup
        id={id}
        title={title}
        content={content}
        isComplete={isComplete}
        isEditModalActive={isEditModalActive}
        setIsEditModalActive={setIsEditModalActive}
      />
    </>
  );
};

export default TodoItem;