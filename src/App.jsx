// import React, { use, useReducer } from 'react';
// import { UserContext } from './main';
// import { Button } from 'react-bootstrap';
// import ToDolist from './ToDoList';

// function App() {
//   const value = use(UserContext);
//   return (
//     <div>
//       {/*<UserContext.Consumer>
//         {(value) => <div>Received, {value}</div>}
//       </UserContext.Consumer>*/}
//       Received, {value}
//     </div>
//   );
// }

// const initialState = {
//   count: 0,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     case 'reset':
//       return initialState;
//     default:
//       return initialState;
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <div>
//       Count: {state.count}
//       <br />
//       <Button variant='primary' onClick={() => dispatch({ type: 'increment' })}>
//         Increment
//       </Button>
//       &nbsp;
//       <Button variant='secondary' onClick={() => dispatch({ type: 'decrement' })}>
//         Decrement
//       </Button>
//       &nbsp;
//       <Button variant='success' onClick={() => dispatch({ type: 'reset' })}>
//         Reset
//       </Button>
//     </div>
//   );
// }

import React, { useReducer } from "react";
import ToDolist from "./ToDoList";
import { v4 as uuidv4 } from "uuid";

// const todosInitialState = {
//   todos: [
//     { id: 1, text: "Playing with dogs" },
//     { id: 2, text: "Picking groceries" },
//     { id: 3, text: "Watching netflix" },
//   ],
// };

const todosInitialState = {
  todos: [],
};

function todosReducer(state, action) {
  switch (action.type) {
    case "get":
      return { ...state, todos: action.payload };
    case "add":
      // const newTodo = { id: uuidv4(), text: action.payload };
      // add new todo onto array
      const addedToDos = [...state.todos, action.payload];
      // spread our state and aassign todos
      return { ...state, todos: addedToDos };
    case "delete":
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id,
      );
      return { ...state, todos: filteredTodoState };
    case "edit":
      const updatedToDo = { ...action.payload };
      const updatedToDoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id,
      );
      const updatedTodos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ];
      return { ...state, todos: updatedTodos };
    default:
      return todosInitialState;
  }
}

export const TodosContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDolist />
    </TodosContext.Provider>
  );
}

export default App;
