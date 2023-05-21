import React, { useState } from "react";
import "./TaskTracker.css";

interface Task {
  id: number;
  title: string;
  subtasks: { id: number; title: string; completed: boolean }[];
}

const TaskTracker = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [subtaskInputs, setSubtaskInputs] = useState<Record<number, string>>(
    {}
  );

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      subtasks: [],
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const addSubtask = (taskId: number, title: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [
            ...task.subtasks,
            { id: Date.now(), title, completed: false },
          ],
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setSubtaskInputs((prevInputs) => {
      const updatedInputs = { ...prevInputs };
      updatedInputs[taskId] = "";
      return updatedInputs;
    });
  };

  const toggleSubtask = (taskId: number, subtaskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map((subtask) => {
          if (subtask.id === subtaskId) {
            return {
              ...subtask,
              completed: !subtask.completed,
            };
          }
          return subtask;
        });

        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <form onSubmit={addTask}>
        <input
          className="task-list"
          type="text"
          placeholder="Enter Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button
              className="deletetask-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
            <ul>
              {task.subtasks.map((subtask) => (
                <li key={subtask.id}>
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => toggleSubtask(task.id, subtask.id)}
                  />
                  {subtask.title}
                </li>
              ))}
            </ul>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const subtaskInputValue = subtaskInputs[task.id] || "";
                if (subtaskInputValue.trim() !== "") {
                  addSubtask(task.id, subtaskInputValue);
                }
              }}
            >
              <input
                type="text"
                placeholder="Enter Subtask Title"
                value={subtaskInputs[task.id] || ""}
                onChange={(e) =>
                  setSubtaskInputs((prevInputs) => ({
                    ...prevInputs,
                    [task.id]: e.target.value,
                  }))
                }
              />
              <button type="submit">Add Subtask</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
