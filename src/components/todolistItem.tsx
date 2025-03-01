import {Button} from "./button.tsx";
import {FilterValuesTypes} from "../App.tsx";
import {useState} from "react";

export type TodolistItemProps = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (tasksId: number) => void
}

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}

export const TodolistItem = (
  {title, tasks, date, removeTask}: TodolistItemProps) => {

  const [filter, setFilter] = useState<FilterValuesTypes>('all');

  const getTasksForTodolist = (allTasks: TaskType[], newFilter: FilterValuesTypes) => {
    switch (newFilter) {
      case 'active':
        return allTasks.filter(task => task.isDone === false)
      case 'completed':
        return allTasks.filter(task => task.isDone === true)
      default:
        return allTasks
    }
  }

  const tasksForTodolist: TaskType[] = getTasksForTodolist(tasks, filter);

  const onClickHandlerDeleteTask = (taskId: number) => {
    removeTask(taskId);
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <Button title={"+"}/>
      </div>
      {tasks.length === 0
        ? (<p>No tasks</p>)
        : (<ul>
          {tasksForTodolist.map((task: TaskType) => {
            return (
              <li key={task.id}>
                <input type={"checkbox"} checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={"x"} onClick={() => onClickHandlerDeleteTask(task.id)}/>
              </li>
            )
          })}
        </ul>)
      }
      <div>
        <Button title={"All"} onClick={() => setFilter("all")}/>
        <Button title={"Active"} onClick={() => setFilter("active")}/>
        <Button title={"Completed"} onClick={() => setFilter("completed")}/>
      </div>
      <div>{date}</div>
    </div>
  )
}
