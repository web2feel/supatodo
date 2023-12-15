import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodos } from "../store/slices/todos";
import Loading from "./Loading";
const TodoList = () => {
  const state = useSelector((state) => state.todos);
  console.log(state.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="border-2 border-neutral-700 rounded">
      <h2 className="p-4 bg-neutral-800 text-center text-xl font-bold">
        Todo Items
      </h2>
      {state.loading && <Loading />}
      <ul className="flex flex-col divide-y divide-dashed divide-neutral-700 ">
        {state.todos.map((item) => {
          return <TodoItem key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
