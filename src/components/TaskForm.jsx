import { useState } from "react";

function TaskForm({ getTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function addTask() {
    if (!title || !description) return;

    await fetch(
      "https://biyovo1194.pythonanywhere.com/api/v1/tasks/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          completed: false,
        }),
      }
    );

    setTitle("");
    setDescription("");

    getTasks();
  }

  return (
    <div className="form">

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button onClick={addTask}>
        Add
      </button>

    </div>
  );
}

export default TaskForm;