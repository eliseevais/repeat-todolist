import {Button} from "./button.tsx";
import {FilterValuesTypes} from "../App.tsx";
import {ChangeEvent, useState} from "react";
import * as React from "react";

export type TodolistItemProps = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (tasksId: string) => void
  createTask: (title: string) => void
  changeTaskStatus: (tasksId: string, isDone: boolean) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export const TodolistItem = (
  {title, tasks, date, removeTask, createTask, changeTaskStatus}: TodolistItemProps) => {

  const [filter, setFilter] = useState<FilterValuesTypes>('all');
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null)

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

  const onClickHandlerDeleteTask = (taskId: string) => {
    removeTask(taskId);
  }

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
    setError(null)
  }

  const createTaskOnEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== '') {
      createTask(trimmedTitle)
      setTaskTitle('')
    } else {
      setError("Title is required")
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input className={error ? 'error' : ''}
               value={taskTitle}
               onChange={changeTaskTitleHandler}
               onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler}/>
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0
        ? (<p>No tasks</p>)
        : (<ul>
          {tasksForTodolist.map((task: TaskType) => {

            const deleteTaskHandler = () => {
              onClickHandlerDeleteTask(task.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, newStatusValue)
            }

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input type={"checkbox"} checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <span>{task.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler}/>
              </li>
            )
          })}
        </ul>)
      }
      <div>
        <Button className={filter === 'all' ? 'active-filter' : ''}
                title={"All"}
                onClick={() => setFilter("all")}/>
        <Button className={filter === 'active' ? 'active-filter' : ''}
                title={"Active"}
                onClick={() => setFilter("active")}/>
        <Button className={filter === 'completed' ? 'active-filter' : ''}
                title={"Completed"}
                onClick={() => setFilter("completed")}/>
      </div>
      <div>{date}</div>
    </div>
  )
}
