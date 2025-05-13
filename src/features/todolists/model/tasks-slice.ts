import { createSlice, nanoid } from "@reduxjs/toolkit";
import {
  createTodolistTC,
  deleteTodolistTC,
} from "@/features/todolists/model/todolists-slice.ts";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = Record<string, Task[]>;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state: TasksState) => state,
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>(
      (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(
          (task) => task.id === action.payload.taskId
        );
        if (index !== -1) {
          tasks.splice(index, 1);
        }
      }
    ),

    changeTaskStatusAC: create.reducer<{
      todolistId: string;
      taskId: string;
      isDone: boolean;
    }>((state, action) => {
      const task = state[action.payload.todolistId]?.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.isDone = action.payload.isDone;
      }
    }),

    changeTaskTitleAC: create.reducer<{
      todolistId: string;
      taskId: string;
      title: string;
    }>((state, action) => {
      const task = state[action.payload.todolistId]?.find(
        (task) => task.id === action.payload.taskId
      );
      if (task) {
        task.title = action.payload.title;
      }
    }),

    createTaskAC: create.preparedReducer(
      (todolistId: string, title: string) => {
        return {
          payload: {
            todolistId,
            task: {
              id: nanoid(),
              title,
              isDone: false,
            } as Task,
          },
        };
      },
      (state, action) => {
        state[action.payload.todolistId].unshift(action.payload.task);
      }
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
});

export const { selectTasks } = tasksSlice.selectors;

export const {
  deleteTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
