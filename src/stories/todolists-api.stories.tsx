import { useEffect, useState } from "react";
import axios from "axios";
import { Meta } from "@storybook/react";

const settings = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
};

const meta: Meta = {
  title: "API/GetTodolists",
  tags: ["autodocs"],
};

export default meta;

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    axios
      .get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
      .then((response) => {
        setState(response.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolists = () => {
  const [state, setState] = useState<any>(null);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    axios
      .post(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title: "IRINA TL" },
        settings
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolists = () => {
  const [state, setState] = useState<any>(null);
  const [error, setError] = useState<any>("");

  let todolistId = "3e8e6a60-9b42-4088-b32e-3dbfa3db543e";

  useEffect(() => {
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        settings
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolists = () => {
  const [state, setState] = useState<any>(null);
  const [error, setError] = useState<any>("");

  let todolistId = "0a219055-2c52-48fa-a656-302433db3ebb";

  useEffect(() => {
    axios
      .put(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        { title: "Irina Tl" },
        settings
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [error, setError] = useState<any>("");

  let todolistId = "9ef9ee0a-3ef7-4f56-9f00-ab682e341ae1";

  useEffect(() => {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
        settings
      )
      .then((response) => {
        setState(response.data.items);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const [error, setError] = useState<any>("");

  let todolistId = "9ef9ee0a-3ef7-4f56-9f00-ab682e341ae1";
  let taskId = "5289e700-4999-4bc5-88fa-533fb29d4dd2";

  useEffect(() => {
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}/tasks/${taskId}`,
        settings
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <div>{JSON.stringify(state)}</div>;
};
