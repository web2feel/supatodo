import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../store/slices/todos";

const Form = () => {
  const [todoItem, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(createTodo([{ title: todoItem, done: false }]));
    setTodo("");
  };

  return (
    <div className="flex gap-3 justify-between">
      <input
        placeholder="Add an item"
        type="text"
        className="p-4 rounded border-2 border-neutral-700 bg-transparent flex-1"
        value={todoItem}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 py-4 px-6 rounded hover:bg-green-700 duration-300"
      >
        Add Todo
      </button>
    </div>
  );
};

export default Form;
