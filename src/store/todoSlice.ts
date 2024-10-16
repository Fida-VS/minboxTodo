import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";


type Todo = {
  id: string;
  title: string;
  completed: boolean;
}


type TodosState = {
  todos: Todo[];
  filter: string;
  status: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  filter: 'all',
  status: false,
  error: null
}


export const fetchTodos = createAsyncThunk<Todo[], undefined, {rejectValue: string}>(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();

      return data;
    }
);


export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function (id, { rejectWithValue }) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      })
  
      if (!response.ok) {
        return rejectWithValue('Can\'t delete task. Server error.');
      }
  
      return id;
    }
  );

export const toggleStatus = createAsyncThunk<Todo, string, { rejectValue: string, state: { todos: TodosState} }>(
    'todos/toggleStatus',
    async function (id, { rejectWithValue, getState }) {
      const todo = getState().todos.todos.find(todo => todo.id === id);
  
      if (todo) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !todo.completed,
          })
        });
    
        if (!response.ok) {
          return rejectWithValue('Can\'t toggle status. Server error.');
        }
    
        return (await response.json()) as Todo; 
      }
  
      return rejectWithValue('No such todo in the list!')
    }
  );

  export const addNewTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
    'todos/addNewTodo',
    async function (text, { rejectWithValue }) {
        const todo = {
          title: text,
          userId: 1,
          completed: false,
        };
  
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
        });
  
        if (!response.ok) {
          return rejectWithValue('Can\'t add task. Server error.');
        }
  
        return (await response.json()) as Todo;
    }
  );


const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
    changeFilter(state, action: PayloadAction<string>){
      state.filter = action.payload;
    }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchTodos.pending, (state) => {
          state.status = true;
          state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
 .addCase(toggleStatus.fulfilled, (state, action) => {
    const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
    if (toggledTodo) {
      toggledTodo.completed = !toggledTodo.completed;
    }
  })
  .addMatcher(isError, (state, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.status = false;
  });
    
  }
  });


 export const { changeFilter } = todoSlice.actions;

export default todoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
  }