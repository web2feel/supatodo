import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase";

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

// C R U D
// READ

export const fetchTodos = createAsyncThunk(
  "Todo/fetchTodos",
  async (_, thunkAPI) => {
    try {
      let { data: Todos, error } = await supabase.from("Todos").select("*");
      if (error) {
        throw Error(error);
      }
      return Todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CREATE

export const createTodo = createAsyncThunk(
  "Todo/createTodo",
  async (_data, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("Todos")
        .insert([..._data])
        .select();

      if (error) {
        throw Error(error);
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// UPDATE

export const updateTodo = createAsyncThunk(
  "Todo/updateTodo",
  async (_data, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("Todos")
        .update({ done: _data.done })
        .eq("id", _data.id)
        .select();
      if (error) {
        throw Error(error);
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// DELETE

export const deleteTodo = createAsyncThunk(
  "Todo/deleteTodo",
  async (id, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from("Todos")
        .delete()
        .eq("id", id)
        .select();
      if (error) {
        throw Error(error);
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = state.todos.find(
          (item) => item.id === action.payload.id
        );
        updatedTodo.done = action.payload.done;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export default todoSlice.reducer;
