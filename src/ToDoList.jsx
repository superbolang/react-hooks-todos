import React, { use, useState, useEffect } from "react";
import { TodosContext } from "./App";
import { Button, Table, Form } from "react-bootstrap";
import useAPI from "./useAPI";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function ToDolist() {
  // receive state and dispatchg from App.jsx
  const { state, dispatch } = use(TodosContext);
  const [todoText, setTodoText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const buttonTitle = editMode ? "Edit" : "Add";

  const endpoint = "http://localhost:3000/todos/";
  const savedTodo = useAPI(endpoint);
  useEffect(() => {
    dispatch({ type: "get", payload: savedTodo });
  }, [savedTodo]); // dispatch whoever savedTodos changes

  const handleSubmit = async (formData) => {
    if (editMode) {
      await axios.patch(endpoint + editTodo.id, { text: todoText });
      dispatch({ type: "edit", payload: { ...editTodo, text: todoText } });
      setEditMode(false);
      setEditTodo(null);
    } else {
      const newToDo = { id: uuidv4(), text: todoText };
      const response = await axios.post(endpoint, newToDo);
      dispatch({ type: "add", payload: newToDo });
    }
    setTodoText(""); // to clear field after adding
  };
  return (
    <div style={{ padding: 5 }}>
      <Form action={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter To Do"
            onChange={(event) => setTodoText(event.target.value)}
            value={todoText}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {buttonTitle}
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.text}</td>
              <td
                onClick={() => {
                  setTodoText(todo.text);
                  setEditMode(true);
                  setEditTodo(todo);
                }}
              >
                <Button variant="link">Edit</Button>
              </td>
              <td
                onClick={async () => {
                  await axios.delete(endpoint + todo.id);
                  dispatch({ type: "delete", payload: todo });
                }}
              >
                <Button variant="link">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ToDolist;
