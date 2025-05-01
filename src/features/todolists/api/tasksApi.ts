import { instance } from "@/common/instance";
import {
  BaseResponse,
  GetTasksResponse,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload;
    return instance.post<BaseResponse>(`/todo-lists/${todolistId}/tasks`, {
      title,
    });
  },
  updateTask(payload: {
    todolistId: string;
    taskId: string;
    model: UpdateTaskModel;
  }) {
    const { todolistId, taskId, model } = payload;
    return instance.put<BaseResponse>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload;
    return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
