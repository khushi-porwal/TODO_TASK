const API_URL = "http://localhost:5000/todos";


export const getTodos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};


export const addTodo = async (title: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      status: "todo"
    })
  });

  return response.json();
};


export const deleteTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  return response.json();
};


export const updateTodo = async (
  id: number,
  title: string,
  status: string
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      status: status
    })
  });

  return response.json();
};