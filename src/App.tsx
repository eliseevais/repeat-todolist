import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type TasksState = {
  [key: string]: Task[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
  })

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    const nextState: Todolist[] = todolists.map((todolist) => {
      return todolist.id === todolistId
        ? {...todolist, filter: filter}
        : todolist
    })
    setTodolists(nextState)
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    const nextState: TasksState = {
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    }
    setTasks(nextState)
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    const nextState: TasksState = {
      ...tasks,
      [todolistId]: [newTask, ...tasks[todolistId]]
    }
    setTasks(nextState)
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
   const nextState: TasksState = {
     ...tasks,
     [todolistId]: tasks[todolistId].map((task: Task) => {
       return task.id == taskId
         ? {...task, isDone}
         : task
     })
   }
   setTasks(nextState)
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
  }

  return (
    <div className="app">
      {todolists.map((todolist: Todolist) => {
        const todolistTasks = tasks[todolist.id]
        let filteredTasks = todolistTasks
        if (todolist.filter === 'active') {
          filteredTasks = todolistTasks.filter((task: Task) => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = todolistTasks.filter((task: Task) => task.isDone)
        }
        return (
          <TodolistItem key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
          />)
      })}
    </div>
  )
}
