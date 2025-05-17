import { createTodolistTC, deleteTodolistTC } from "./todolists-slice";
import { createAppSlice } from "@/common/utils";
import { tasksApi } from "@/features/todolists/api/tasksApi.ts";
import {
  DomainTask,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts";
import { TaskStatus } from "@/common/enums";
import { RootState } from "@/app/store.ts";
import { setAppStatusAC } from "@/app/app-slice.ts";

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id];
      });
  },
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, thunkAPI) => {
        const { dispatch } = thunkAPI;
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.getTasks(todolistId);
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolistId, tasks: res.data.items };
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks;
        },
      }
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, thunkAPI) => {
        const { dispatch } = thunkAPI;
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.createTask(payload);
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return { task: res.data.data.item };
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.task.todoListId].unshift(action.payload.task);
        },
      }
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, thunkAPI) => {
        try {
          await tasksApi.deleteTask(payload);
          return payload;
        } catch (error) {
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId];
          const index = tasks.findIndex(
            (task) => task.id === action.payload.taskId
          );
          if (index !== -1) {
            tasks.splice(index, 1);
          }
        },
      }
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (
        payload: { todolistId: string; taskId: string; status: TaskStatus },
        thunkAPI
      ) => {
        const { todolistId, taskId, status } = payload;

        const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[
          todolistId
        ];
        const task = allTodolistTasks.find((task) => task.id === taskId);

        if (!task) {
          return thunkAPI.rejectWithValue(null);
        }

        const model: UpdateTaskModel = {
          description: task.description,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          status,
        };

        const { dispatch } = thunkAPI;
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.updateTask({ todolistId, taskId, model });
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return { task: res.data.data.item };
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const task = state[action.payload.task.todoListId].find(
            (task) => task.id === action.payload.task.id
          );
          if (task) {
            task.status = action.payload.task.status;
          }
        },
      }
    ),
    changeTaskTitleTC: create.asyncThunk(
      async (
        payload: { todolistId: string; taskId: string; title: string },
        thunkAPI
      ) => {
        const { todolistId, taskId, title } = payload;

        const state = thunkAPI.getState() as RootState;
        const task = state.tasks[todolistId]?.find((t) => t.id === taskId);

        if (!task) return thunkAPI.rejectWithValue(null);

        const model: UpdateTaskModel = {
          title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        };

        const { dispatch } = thunkAPI;

        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await tasksApi.updateTask({ todolistId, taskId, model });
          dispatch(setAppStatusAC({ status: "succeeded" }));

          return { task: res.data.data.item };
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return thunkAPI.rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          const updatedTask = action.payload.task;
          const tasks = state[updatedTask.todoListId];

          const task = tasks.find((t) => t.id === updatedTask.id);
          if (task) {
            task.title = updatedTask.title;
          }
        },
      }
    ),
  }),
});

export const { selectTasks } = tasksSlice.selectors;
export const {
  fetchTasksTC,
  createTaskTC,
  deleteTaskTC,
  changeTaskStatusTC,
  changeTaskTitleTC,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

export type TasksState = Record<string, DomainTask[]>;
