function TaskItem({ item, getTasks }) {
  async function deleteTask(id) {
    await fetch(
      `https://biyovo1194.pythonanywhere.com/api/v1/tasks/${id}/`,
      {
        method: "DELETE",
      }
    );

    getTasks();
  }

  async function toggleStatus() {
    await fetch(
      `https://biyovo1194.pythonanywhere.com/api/v1/tasks/${item.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !item.completed,
        }),
      }
    );

    getTasks();
  }

  return (
    <tr>

      <td>{item.id}</td>

      <td>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </td>

      <td>
        <button
          className={
            item.completed
              ? "completed"
              : "active"
          }
          onClick={toggleStatus}
        >
          {item.completed
            ? "Completed"
            : "Active"}
        </button>
      </td>

      <td>
        <button
          className="delete"
          onClick={() =>
            deleteTask(item.id)
          }
        >
          Delete
        </button>
      </td>

    </tr>
  );
}

export default TaskItem;