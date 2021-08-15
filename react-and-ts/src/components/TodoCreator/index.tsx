import React, { useRef } from "react";

import { TodoCreatorProps } from "./TodoCreate";

import "./styles.css";

const TodoCreator: React.FC<TodoCreatorProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = textInputRef.current!.value;
    if (!enteredText) return;

    props.addTodos(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input ref={textInputRef} type="text" id="todo-text" />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoCreator;
