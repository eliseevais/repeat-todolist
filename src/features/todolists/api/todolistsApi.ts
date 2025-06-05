import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts";
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts";
import { BaseResponse } from "@/common/types";
import { baseApi } from "@/app/baseApi.ts";

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<any[], void>({
      query: () => "todo-lists",
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" })),
      providesTags: ["Todolist"],
    }),
    addTodolists: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolistTitle: build.mutation<
      BaseResponse,
      { id: string; title: string }
    >({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useLazyGetTodolistsQuery,
  useAddTodolistsMutation,
  useRemoveTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi;
