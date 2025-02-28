import {TaskType, TodolistItemProps} from "../types.ts";
import {Button} from "./button.tsx";

export const TodolistItem = ({title, tasks, date}: TodolistItemProps) => {
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
          {tasks.map((task: TaskType) => {
            return (
              <li key={task.id}>
                <input type={"checkbox"} checked={task.isDone}/>
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>)
      }
      <div>
        <Button title={"All"}/>
        <Button title={"Active"}/>
        <Button title={"Completed"}/>
      </div>
      <div>{date}</div>
    </div>
  )
}
