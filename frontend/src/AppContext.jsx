import { createContext, useContext, useState } from "react";
import ApiFunctions from "./controllers/task";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [newTask, setNewTask] = useState({
    task: "",
    status: false,
  });
  const [update, setUpdate] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const date = new Date();
    const body = {
      task: newTask.task,
      status: newTask.status,
      createdAt: `${date.toISOString().slice(0, 19).replace("T", " ")}`,
      user: user,
    };

    await ApiFunctions.ApiAddTask(body, navigate);

    await getTasks();
    setNewTask({
      task: "",
      status: false,
    });
  };

  const logout = async () => {
    setTasks([]);
    setNewTask({
      task: "",
      status: false,
    });
    setUpdate(0);
    setListLoading(true);
    navigate("/", { replace: true });
    localStorage.clear();
  };

  const getTasks = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await ApiFunctions.ApiGetTasks(user, navigate);
    if (Array.isArray(response)) {
      setTasks(response);
      setListLoading(false);
    }
  };

  const handleToggle = async (id) => {
    const response = await ApiFunctions.ApiHandleToggle(id);
    if (response.ok) {
      await getTasks();
    }
  };

  const handleDelete = async (id) => {
    const response = await ApiFunctions.ApiHandleDelete(id);
    if (response.ok) {
      await getTasks();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await ApiFunctions.ApiHandleDeleteAll();
      if (response.ok) {
        await getTasks();
      }
    } catch (error) {}
  };

  const handleEdit = async (task) => {
    const editTasks = tasks.filter((currentTask) => currentTask.id != task.id);
    setTasks(editTasks);
    setNewTask({ task: task.name, status: task.status });
    setUpdate(task.id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const body = {
      id: update,
      task: newTask.task,
      status: newTask.status,
    };
    const response = await ApiFunctions.ApiHandleUpdate(body);
    if (response.ok) {
      await getTasks();
      setUpdate(0);
      setNewTask({
        task: "",
        status: false,
      });
    }
  };

  const cancelUpdate = () => {
    setNewTask({ task: "", status: false });
    setUpdate(0);
    getTasks();
  };

  return (
    <AppContext.Provider
      value={{
        newTask,
        setNewTask,
        update,
        setUpdate,
        tasks,
        setTasks,
        listLoading,
        setListLoading,
        handleSubmit,
        getTasks,
        handleToggle,
        handleDelete,
        handleDeleteAll,
        handleEdit,
        handleUpdate,
        cancelUpdate,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
