import { useState, useEffect } from "react";
import "./App.css";

type Task = {
  title: string;
  description?: string;
  completed: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [filter, setFilter] = useState<"all" | "done" | "todo">("all");

  // ⚡️ Nouveau state pour la confirmation
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask: Task = {
        title: input,
        description: description.trim() !== "" ? description : undefined,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
      setDescription("");
    }
  };

  // ⚡️ Nouvelle logique : ouverture du pop-up au lieu de supprimer directement
  const confirmDeleteTask = (index: number) => {
    setTaskToDelete(index);
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((_, i) => i !== taskToDelete));
      if (editingIndex === taskToDelete) setEditingIndex(null);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditTitle(tasks[index].title);
    setEditDescription(tasks[index].description || "");
  };

  const handleEditSave = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index
          ? { ...task, title: editTitle, description: editDescription }
          : task
      )
    );
    setEditingIndex(null);
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.completed;
    if (filter === "todo") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1 className="title">Ma To-Do List 📝</h1>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une tâche..."
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optionnel)..."
        />
        <button onClick={handleAddTask} className="btn primary">Ajouter</button>
      </div>

      <div className="stats">
        <span className="done">Fait : {completedCount}</span>
        <span className="todo">Restant : {remainingCount}</span>
        <span className="total">Total : {tasks.length}</span>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "btn active" : "btn"}
          onClick={() => setFilter("all")}
        >
          Toutes
        </button>
        <button
          className={filter === "done" ? "btn active" : "btn"}
          onClick={() => setFilter("done")}
        >
          Fait
        </button>
        <button
          className={filter === "todo" ? "btn active" : "btn"}
          onClick={() => setFilter("todo")}
        >
          À faire
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task, idx) => (
          <li key={idx} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(tasks.indexOf(task))}
            />

            <div className="task-content">
              {editingIndex === tasks.indexOf(task) ? (
                <div className="edit-fields">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description (optionnel)"
                  />
                </div>
              ) : (
                <>
                  <span
                    className={`task-title ${
                      task.completed ? "completed" : "pending"
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                </>
              )}
            </div>

            <div className="task-actions">
              {editingIndex === tasks.indexOf(task) ? (
                <>
                  <button
                    className="btn small save"
                    onClick={() => handleEditSave(tasks.indexOf(task))}
                  >
                    Enregistrer
                  </button>
                  <button className="btn small cancel" onClick={handleEditCancel}>
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn small edit"
                    onClick={() => startEditing(tasks.indexOf(task))}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn small delete"
                    onClick={() => confirmDeleteTask(tasks.indexOf(task))}
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* ⚡️ Pop-up de confirmation */}
      {taskToDelete !== null && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Voulez-vous vraiment supprimer cette tâche ?</p>
            <div className="popup-actions">
              <button className="btn small delete" onClick={handleDeleteTask}>
                Oui, supprimer
              </button>
              <button className="btn small cancel" onClick={cancelDelete}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
