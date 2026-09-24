import { useState } from 'react';

interface AddTaskProps {
  onAddTaskClick: (title: string, description: string) => void;
}

function AddTesk({ onAddTaskClick }: AddTaskProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="w-full max-w-md mx-auto p-3 bg-violet-300 rounded-2xl text-white flex flex-col gap-4">
      <input 
        type="text" 
        placeholder="Adicionar uma nova tarefa..." 
        className="bg-violet-100 rounded-md py-2 px-4 focus:border-none focus:outline-none text-black" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="Descrição da tarefa..." 
        className="bg-violet-100 rounded-md py-2 px-4 focus:border-none focus:outline-none text-black" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button 
      onClick={() => {
        onAddTaskClick(title, description);
        setTitle("");
        setDescription("");
        }
      }
      className="bg-violet-950 p-2 rounded-lg hover:cursor-pointer hover:bg-violet-800">
        Adicionar Tarefa
      </button>
    </div>
  );
}

export default AddTesk;
