import React from "react";

import { TodoListProps } from "./TodoList";

import "./styles.css";

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span className="todo-text">{todo.text}</span>
          <button
            className="todo-button"
            onClick={() => props.removeTodo(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
