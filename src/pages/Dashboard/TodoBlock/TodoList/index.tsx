import { ChangeEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './TodoList.scss';
import { useAppDispatch } from "../../../../hooks";
import { useSelector } from "react-redux";
import { selectTodos } from "../../../../redux/todos/selectors";
import TodoItem from "../TodoItem";
import { clearAll } from "../../../../redux/todos/slice";
import DropDown from "../DropDown";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

const TodoList = () => {
  const [all, setAll] = useState(true);
  const dispatch = useAppDispatch();
  const { todos } = useSelector(selectTodos);
  const doneTodos = todos.filter(todo => todo.isComplete);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.dataset.catagory === 'all') {
      setAll(true);
    } else if (e.target.dataset.catagory === 'done') {
      setAll(false);
    }
  };
  const onClearClick = () => dispatch(clearAll());

  return (
    <div className="tasks">
      <div className="tasks__title">
        <StickyNote2Icon/>
        <h2 className="tasks__title__text">Все задачи</h2>
      </div>
      <div className="tasks__sort">
        <DropDown changeCategory={handleChange} all={all}/>
        <motion.button onClick={onClearClick} whileTap={{ scale: .9 }} className="clear-all">
          Удалить все
        </motion.button>
      </div>
      <div className="tasks__container">
        <AnimatePresence>
          {todos.length ? (
            all
              ? todos.map(todo => <TodoItem key={todo.id} {...todo}/>)
              : doneTodos.map(todo => <TodoItem key={todo.id} {...todo}/>)
          ) : <h4 className="nothing">На данный момент у вас нет задач!</h4>}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoList;