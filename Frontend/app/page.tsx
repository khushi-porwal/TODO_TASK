"use client"

import { useState, useEffect } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:5000/todos");
    const data = await response.json();

    setTodos(data.data);
  }
  
  const deleteTask = async(id)=>{
     await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE"
     })

     getData();
  }

  const addTask = async () => {
    if (title.trim() == "") return;

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        status: "todo"
      })
    });

    setTitle("");
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <h1>Todo App</h1>

      <input
        type="text"
        placeholder="Enter your task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>
        Add
      </button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>

          <button onClick={()=> deleteTask(todo.id)}>Delete</button>

          <button >Update</button>
        </div>
      ))}
    </main>
  )
}