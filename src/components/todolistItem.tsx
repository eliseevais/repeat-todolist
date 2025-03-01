import {Button} from "./button.tsx";
import {FilterValuesTypes} from "../App.tsx";
import {ChangeEvent, useState} from "react";

export type TodolistItemProps = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (tasksId: string) => void
  createTask: (title: string) => void
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export const TodolistItem = (
  {title, tasks, date, removeTask, createTask}: TodolistItemProps) => {

  const [filter, setFilter] = useState<FilterValuesTypes>('all');
  const [taskTitle, setTaskTitle] = useState<string>('');

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
  }

  // @ts-ignore
  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }

  const createTaskHandler = () => {
    createTask(taskTitle)
    setTaskTitle('')
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle}
               onChange={changeTaskTitleHandler}
               onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler}/>
      </div>
      {tasks.length === 0
        ? (<p>No tasks</p>)
        : (<ul>
          {tasksForTodolist.map((task: TaskType) => {

            const deleteTaskHandler = () => {
              onClickHandlerDeleteTask(task.id)
            }

            return (
              <li key={task.id}>
                <input type={"checkbox"} checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler}/>
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
