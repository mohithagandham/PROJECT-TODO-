import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Create new Todo
  const addTodo = () => {
    const newTodo = {
      title,
      description,
      startDate,
      endDate,
      duration,
    };

    axios
      .post("http://localhost:5000/api/todos", newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        resetForm();
      })
      .catch((error) => console.log(error));
  };

  // Delete Todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log(error));
  };

  // Start Editing Todo
  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setStartDate(todo.startDate);
    setEndDate(todo.endDate);
    setDuration(todo.duration);
    setEditing(true);
    setCurrentId(todo._id);
  };

  // Update Todo
  const updateTodo = () => {
    const updatedTodo = {
      title,
      description,
      startDate,
      endDate,
      duration,
    };

    axios
      .put(`http://localhost:5000/api/todos/${currentId}`, updatedTodo)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo._id === currentId ? { ...todo, ...response.data } : todo
          )
        );
        resetForm();
      })
      .catch((error) => console.log(error));
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setDuration("");
    setEditing(false);
  };

  return (
    <div className="container">
      <h1 className="heading">To-Do List</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editing ? updateTodo() : addTodo();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button type="submit">{editing ? "Update" : "Add"} Todo</button>
      </form>

      {todos.map((todo) => (
        <div className="card" key={todo._id}>
          <h5>{todo.title}</h5>
          <p>{todo.description}</p>
          <p><strong>Start Date:</strong> {todo.startDate}</p>
          <p><strong>End Date:</strong> {todo.endDate}</p>
          <p><strong>Duration:</strong> {todo.duration}</p>
          <div className="buttons">
            <button
              className="btn-warning"
              onClick={() => editTodo(todo)}
            >
              Edit
            </button>
            <button
              className="btn-danger"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;