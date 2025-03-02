import './App.css'
import {TaskType, TodolistItem} from "./components/todolistItem.tsx";
import {useState} from "react";
import {v1} from 'uuid';

export type FilterValuesTypes = "all" | "active" | "completed";

export const App = () => {

  const tasks1: TaskType[] = [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'Typescript', isDone: false},
    {id: v1(), title: 'RTK query', isDone: false},
  ]

  const [tasks, setTasks] = useState<TaskType[]>(tasks1);

  const removeTask = (id: string) => {
    const newTasks: TaskType[] = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== id) {
        newTasks.push(tasks[i]);
      }
    }
    setTasks(newTasks);
  }

  const createTask = (title: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false
    }
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const newState = tasks.map(
      task => task.id == taskId
        ? { ...task, isDone }
        : task)
    setTasks(newState)
  }

  return (
    <div className="app">
      <TodolistItem title={"What to learn"}
                    tasks={tasks}
                    date={"2025-02-28"}
                    removeTask={removeTask}
                    createTask={createTask}
                    changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}
