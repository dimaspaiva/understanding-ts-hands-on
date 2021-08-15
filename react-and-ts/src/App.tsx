import { useState } from "react";

import TodoList from "./components/TodoList";
import TodoCreator from "./components/TodoCreator";
import { Todo } from "./Todo";

import "./index.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos((previousTodos) => [
      ...previousTodos,
      { id: String(Math.random()), text },
    ]);
  };

  const todoRemoveHandler = (id: string) => {
    setTodos((previousTodos) =>
      previousTodos.filter((previousTodo) => previousTodo.id !== id)
    );
  };

  return (
    <div className="App">
      <TodoCreator addTodos={todoAddHandler} />
      <TodoList items={todos} removeTodo={todoRemoveHandler} />
    </div>
  );
};

export default App;
