import { Todo } from "../../Todo";

export type TodoListProps = {
  items: Todo[];
  removeTodo: (id: string) => void;
};
