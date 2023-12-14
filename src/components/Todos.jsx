import Form from "./Form";
import TodoList from "./TodoList";

const Todos = () => {
  return (
    <div className="flex flex-col gap-6 min-h-screen p-6">
      <Form />
      <TodoList />
    </div>
  );
};

export default Todos;
