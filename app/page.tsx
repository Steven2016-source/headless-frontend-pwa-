"use client";
import { useState, useEffect } from "react";

interface Task {
  text: string;
  duration: string;
  note: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  // Load saved tasks
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (!taskInput.trim()) return alert("Please enter a task name.");
    const newTask: Task = {
      text: taskInput.trim(),
      duration: durationInput.trim(),
      note: noteInput.trim(),
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
    setDurationInput("");
    setNoteInput("");
  };

  // Edit task
  const editTask = (index: number) => {
    const current = tasks[index];
    const newText = prompt("Edit task name:", current.text) || current.text;
    const newDuration = prompt("Edit duration:", current.duration) || current.duration;
    const newNote = prompt("Edit note:", current.note) || current.note;

    const updated = [...tasks];
    updated[index] = { text: newText, duration: newDuration, note: newNote };
    setTasks(updated);
  };

  // Delete task
  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // AI generate placeholder (you can link real API later)
  const generateWithAI = async () => {
    const aiTasks = [
      { text: "Plan tomorrow’s schedule", duration: "30 mins", note: "Include priority tasks" },
      { text: "Practice JavaScript", duration: "2 hrs", note: "Work on API project" },
      { text: "Read a chapter of a book", duration: "1 hr", note: "Focus on productivity" },
    ];
    setTasks([...tasks, ...aiTasks]);
  };

  return (
    <div className="glass w-full max-w-2xl p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Smart To-Do</h1>
        <button
          onClick={generateWithAI}
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-xl transition"
        >
          Generate with AI
        </button>
      </div>

      {/* Add Task Form */}
      <div className="space-y-3 mb-6">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Task name..."
          className="w-full p-2 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-200"
        />
        <input
          type="text"
          value={durationInput}
          onChange={(e) => setDurationInput(e.target.value)}
          placeholder="Duration or deadline"
          className="w-full p-2 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-200"
        />
        <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Notes"
          className="w-full p-2 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-white placeholder-gray-200"
          rows={2}
        ></textarea>
        <button
          onClick={addTask}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition w-full"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task, i) => (
          <li
            key={i}
            className="bg-white/10 p-3 rounded-lg flex flex-col gap-1 transition hover:bg-white/20"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{task.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editTask(i)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(i)}
                  className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            {task.duration && <p className="text-sm text-gray-300">🕒 {task.duration}</p>}
            {task.note && <p className="text-sm text-gray-200 italic">📝 {task.note}</p>}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <p className="text-center text-gray-300 mt-6 text-sm">
        Powered Productivity by Toluwalope Stephen | 09029348422
      </p>
    </div>
  );
}
