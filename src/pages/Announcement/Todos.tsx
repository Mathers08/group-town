import React from 'react';
import TodoList from "../../components/Todos/TodoList";
import AddTodo from "../../components/Todos/AddTodo";

const Todos = () => {
  return (
    <div>
      <h1 className='page__header'>{"\u00a0"}Список дел</h1>
      <AddTodo/>
      <TodoList/>
    </div>
  );
};

export default Todos;