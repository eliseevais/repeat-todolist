import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts";
import type { RequestStatus } from "@/common/types";

export type FilterValues = "all" | "active" | "completed";
export type DomainTodolist = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatus;
};
