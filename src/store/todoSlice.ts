import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
}

type TodosState = {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
      addTodo(state, action: PayloadAction<string>) {
        state.todos.push({
          id: new Date().toISOString(),
          text: action.payload,
          completed: false,
        });
    },
    toggleComplete(state, action: PayloadAction<string>) {
        const toggledTodo: Todo | undefined = state.todos.find(todo => todo.id === action.payload);
        toggledTodo.completed = !toggledTodo.completed;
    },
    removeTodo(state, action) {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
    },
  });


  export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;