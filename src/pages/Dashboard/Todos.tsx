import React from 'react';
import TodoList from "../../components/Todos/TodoList";
import AddTodo from "../../components/Todos/AddTodo";

const Todos = () => {
  return (
    <div>
      <AddTodo/>
      <TodoList/>
    </div>
  );
};

export default Todos;