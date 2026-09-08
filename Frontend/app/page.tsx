"use client"

import { useState, useEffect } from "react";

import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
} from "../api/todoApi";


export default function Home() {

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const getData = async () => {
    try {
      setLoading(true);

      const data = await getTodos();

      setTodos(data.data);

    } catch (error) {
      setError("Something went wrong");

    } finally {
      setLoading(false);
    }
  };


  const addTask = async () => {

    if (title.trim() == "") {
      setError("Please enter a task");
      return;
    }

    try {

      await addTodo(title);

      setError("");
      setTitle("");

      getData();

    } catch (error) {

      setError("Task not added");

    }
  };


  const deleteTask = async (id) => {

    try {

      await deleteTodo(id);

      getData();

    } catch (error) {

      setError("Task not deleted");

    }
  };


  const updateTask = async (id) => {

    try {

      await updateTodo(
        id,
        editTitle,
        editStatus
      );

      setEditTitle("");
      setEditStatus("");
      setEditId("");

      getData();

    } catch (error) {

      setError("Task not updated");

    }
  };


  useEffect(() => {
    getData();
  }, []);


  return (
    <main>

      <h1>Todo App</h1>


      <div className="add-task">

        <input
          type="text"
          placeholder="Enter your task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>
          Add
        </button>

      </div>


      {error && <p>{error}</p>}

      {loading && <p>Loading...</p>}


      {todos.map((todo) => (

        <div className="todo-card" key={todo.id}>

          <div className="task-info">

            <p>{todo.title}</p>
            <p>{todo.status}</p>

          </div>


          <button onClick={() => deleteTask(todo.id)}>
            Delete
          </button>


          <button
            onClick={() => {
              setEditId(todo.id);
              setEditTitle(todo.title);
              setEditStatus(todo.status);
            }}
          >
            Edit
          </button>


          {editId == todo.id && (

            <div className="update-section">

              <input
                type="text"
                placeholder="Update Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />


              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In-Progress</option>
                <option value="done">Done</option>
              </select>


              <button onClick={() => updateTask(todo.id)}>
                Update
              </button>

            </div>

          )}

        </div>

      ))}

    </main>
  );
}