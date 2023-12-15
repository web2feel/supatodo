import Checkbox from "./Checkbox";
import Close from "./Close";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../store/slices/todos";
import { parseISO, differenceInHours } from "date-fns";

const TodoItem = ({ item }) => {
  const dispatch = useDispatch();

  // dynamic style properties
  let itemStyle = `cursor-pointer ${
    item.done ? "text-neutral-500" : "text-neutral-300"
  }`;

  // Parse the ISO string to a Date object
  const dateObject = parseISO(item.created_at);
  // Format the Date object as a string in a desired format
  const timeAgo = differenceInHours(new Date(), dateObject);

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
        <span className="text-xs mr-4 border py-1 px-2 rounded text-neutral-400 border-neutral-700 bg-neutral-950">
          {timeAgo} hours ago
        </span>
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
