import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  async function getTasks() {
    try {
      const res = await fetch(
        "https://biyovo1194.pythonanywhere.com/api/v1/tasks/"
      );

      const data = await res.json();

      setTasks(data.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((item) => item.completed).length;
  const active = total - completed;

  let filteredTasks = tasks.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filter === "active") {
    filteredTasks = filteredTasks.filter((item) => !item.completed);
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((item) => item.completed);
  }

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="container">

        <div className="top">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filters">
            <button onClick={() => setFilter("all")}>
              All
            </button>

            <button onClick={() => setFilter("active")}>
              Active
            </button>

            <button onClick={() => setFilter("completed")}>
              Completed
            </button>
          </div>
        </div>

        <TaskForm getTasks={getTasks} />

        <div className="stats">
          <span>Total: {total}</span>
          <span>Done: {completed}</span>
          <span>Active: {active}</span>
        </div>

        <TaskList
          tasks={filteredTasks}
          getTasks={getTasks}
        />
      </div>
    </div>
  );
}

export default App;