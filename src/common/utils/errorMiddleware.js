import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const errorMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected")) {
    // Обработка ошибки
    console.error("Ошибка произошла:", action.error);

    // Показ уведомления через библиотеку toast:
    toast.error("Произошла ошибка: " + action.error.message);
  }

  // Передача действия дальше
  return next(action);
};
