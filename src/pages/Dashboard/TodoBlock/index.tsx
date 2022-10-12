import React from 'react';
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

const TodoBlock = () => {
  return (
    <div>
      <AddTodo/>
      <TodoList/>
    </div>
  );
};

export default TodoBlock;