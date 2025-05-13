import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "@/common/hooks";
import {
  changeTodolistTitleTC,
  deleteTodolistTC,
} from "@/features/todolists/model/todolists-slice.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styles from "./TodolistTitle.module.css";
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts";

type Props = {
  todolist: Todolist;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist;

  const dispatch = useAppDispatch();

  const deleteTodolist = () => {
    dispatch(deleteTodolistTC(id));
  };

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }));
  };

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
