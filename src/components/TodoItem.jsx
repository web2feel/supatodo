import Checkbox from "./Checkbox";
import Close from "./Close";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../store/slices/todos";
const TodoItem = ({ item }) => {
  let itemStyle = `cursor-pointer ${
    item.done ? "text-neutral-500" : "text-neutral-300"
  }`;

  const dispatch = useDispatch();

  //handler for update
  const handleUpdate = () => {
    dispatch(updateTodo({ id: item.id, done: !item.done }));
  };

  //handler for delete
  const handleDelete = () => {
    dispatch(deleteTodo(item.id));
  };

  return (
    <li className="p-4 flex gap-4">
      {item.done && <Checkbox />}
      <p onClick={handleUpdate} className={itemStyle}>
        <span className="text-xs mr-4">{item.created_at.substring(0,10)}</span>
        {item.title}
      </p>
      <button
        onClick={handleDelete}
        className="ml-auto text-neutral-400 hover:text-red-500 "
      >
        <Close />
      </button>
    </li>
  );
};

export default TodoItem;
