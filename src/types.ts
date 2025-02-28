export type TodolistItemProps = {
  title: string
  tasks: TaskType[]
  date?: string
}

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean
}

export type ButtonPropsType = {
  title: string
}
