import TaskItem from "./TaskItem";

function TaskList({ tasks, getTasks }) {
  return (
    <table>

      <thead>
        <tr>
          <th>ID</th>
          <th>Vazifa</th>
          <th>Holati</th>
          <th>Amallar</th>
        </tr>
      </thead>

      <tbody>

        {tasks.map((item) => (
          <TaskItem
            key={item.id}
            item={item}
            getTasks={getTasks}
          />
        ))}

      </tbody>

    </table>
  );
}

export default TaskList;