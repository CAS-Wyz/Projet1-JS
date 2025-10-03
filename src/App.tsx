import { useState } from "react";
import "./App.css";

type Task = {
  title: string;
  description?: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState(""); 

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask: Task = {
        title: input,
        description: description.trim() !== "" ? description : undefined,
        completed: false
      };

      setTasks([...tasks, newTask]);
      setInput("");
      setDescription("");
    }
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Ma To-Do List 📝</h1>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ajouter une tâche..."
      />

      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description de la tâche (optionnel)..."
      />

      <button onClick={handleAddTask}>Ajouter</button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tasks.map((task, idx) => (
          <li 
            key={idx} 
            style={{ 
              margin: "8px 0", 
              display: "flex", 
              alignItems: "center", 
              gap: "10px" 
            }}
          >
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleTaskCompletion(idx)} 
            />

            <div style={{ flexGrow: 1 }}>
              <span 
                style={{ 
                  color: task.completed ? "green" : "red", 
                  fontWeight: "bold" 
                }}
              >
                {task.title}
              </span>
              {task.description && (
                <p style={{ margin: "0 0 0 10px", fontSize: "1em", color: "#000000ff" }}>
                  {task.description}
                </p>
              )}
            </div>

            <button onClick={() => handleDeleteTask(idx)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;