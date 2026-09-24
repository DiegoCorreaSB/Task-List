import TaskRender from "./components/TaskRender";
import AddTesk from "./components/AddTesk";
import "./App.css";
import { TaskData, type Task } from "./database/TaskData";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<Task[]>(TaskData);

  function onAddTaskClick(title: string, description: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function onDeleteTaskClick(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <section
        id="container"
        className="w-screen h-screen bg-violet-600 flex items-center flex-col gap-7 p-5"
      >
        <h1 className="text-3xl font-bold text-white">LISTA DE TAREFAS</h1>
        <AddTesk onAddTaskClick={onAddTaskClick} />
        {tasks.length > 0 && (
          <TaskRender tasks={tasks} onDeleteTaskClick={onDeleteTaskClick} />
        )}
      </section>
    </>
  );
}

export default App;
