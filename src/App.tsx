import './App.css'
import {TaskType, TodolistItem} from "./components/todolistItem.tsx";
import {useState} from "react";

export type FilterValuesTypes = "all" | "active" | "completed";

export const App = () => {

  const tasks1: TaskType[] = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
    {id: 5, title: 'Typescript', isDone: false},
    {id: 6, title: 'RTK query', isDone: false},
  ]

  const [tasks, setTasks] = useState<TaskType[]>(tasks1);

  const removeTask = (id: number) => {
    const newTasks: TaskType[] = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== id) {
        newTasks.push(tasks[i]);
      }
    }
    setTasks(newTasks);
  }

  return (
    <div className="app">
      <TodolistItem title={"What to learn"}
                    tasks={tasks}
                    date={"2025-02-28"}
                    removeTask={removeTask}
      />
    </div>
  )
}
