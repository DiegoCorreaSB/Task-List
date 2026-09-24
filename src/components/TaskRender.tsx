import { Check, SquarePen, Trash } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskRenderProps {
  tasks: Task[];
  onDeleteTaskClick: (id: string) => void;
}

function TaskRender({ tasks, onDeleteTaskClick }: TaskRenderProps) {
  return (
    <>
      <ul className="w-full max-w-md mx-auto p-3 bg-violet-300 rounded-2xl text-white">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center rounded-lg mb-4 gap-0.5 "
          >
            <p className="flex-1 bg-violet-950 p-2 rounded-lg hover:cursor-pointer hover:bg-violet-800">
              {task.title}
            </p>
            <button className="bg-violet-950 p-2 rounded-lg hover:cursor-pointer hover:bg-violet-800 focus:outline-none focus:border-none">
              <Check />
            </button>
            <button className="bg-violet-950 p-2 rounded-lg hover:cursor-pointer hover:bg-violet-800 focus:outline-none focus:border-none">
              <SquarePen />
            </button>
            <button
              className="bg-violet-950 p-2 rounded-lg hover:cursor-pointer hover:bg-violet-800 focus:outline-none focus:border-none"
              onClick={() => onDeleteTaskClick(task.id)}
            >
              <Trash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskRender;
